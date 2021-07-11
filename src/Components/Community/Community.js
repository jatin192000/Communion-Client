import React, { useState, useEffect, useContext } from "react";
import CommunityService from "../../Services/CommunityService";
import "../Profile/profile.css";
import PostItem from "../Posts/PostItem";
import PostService from "../../Services/PostService";
import { useParams } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import ProfileLoader from "../Loaders/ProfileLoader";
import PostLoader from "../Loaders/PostLoader";
const PF = "/Images/";

const Community = (props) => {
	const [community, setCommunity] = useState(null);
	const username = useParams().username;
	const [posts, setPosts] = useState([]);
	const [following, setFollowing] = useState(true);
	const [followersCount, setFollowersCount] = useState(0);
	const [isadmin, setIsAdmin] = useState(false);
	const authContext = useContext(AuthContext);
	useEffect(() => {
		CommunityService.get(username).then((data) => {
			if (data.success) {
				setCommunity(data.community);
				if (data.community.admin) {
					const admin = data.community.admin.find(
						(admin) =>
							admin["username"] === authContext.user.username
					);
					if (admin && admin.username === authContext.user.username) {
						setIsAdmin(true);
					}
				}
				setFollowersCount(data.community.followers.length);
				if (
					data.community.followers !== undefined &&
					data.community.followers.includes(authContext.user._id)
				) {
					setFollowing(true);
				} else {
					setFollowing(false);
				}
			} else {
				props.history.push("/error");
			}
		});

		PostService.getCommunityDashboardPosts(username).then((data) => {
			setPosts(data.posts);
		});
	}, [username, community, authContext.user, props.history]);

	const followCommunity = async () => {
		if (!authContext.isAuthenticated) {
			props.history.push("/");
		}
		try {
			await CommunityService.follow(community.username).then((data) => {
				if (data.success) {
					if (data.message === "Community has been unfollowed") {
						setFollowing(false);
					} else {
						setFollowing(true);
					}
				}
			});
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div className="gap-4">
			{community ? (
				<div className="profile bg-white mb-5">
					<div className="profileRight">
						<div className="profileRightTop">
							<div className="profileCover">
								<img
									className="profileCoverImg"
									src={PF + community.coverPicture}
									alt=""
								/>
								<img
									className="profileUserImg"
									src={PF + community.profilePicture}
									alt=""
								/>
								<div className="btn">
									{isadmin ? (
										<Link
											to={`/community/${username}/editProfile`}
											className="btn-editprofile"
										>
											Edit Profile
										</Link>
									) : following ? (
										<button
											onClick={followCommunity}
											className="btn-following"
										>
											Following
										</button>
									) : (
										<button
											onClick={followCommunity}
											className="btn-follow"
										>
											Follow
										</button>
									)}
								</div>
							</div>
						</div>

						<div className="grid grid-cols-1 justify-items-center">
							<h4 className="profileInfoName">
								{community.name}
							</h4>
							<span className="font-normal text-gray-600">
								@{community.username}
							</span>
						</div>
						<div className="grid grid-cols-2 p-3">
							<div className="grid grid-cols-1">
								<span className="text-gray-700 ml-3">
									{community.about}
								</span>
							</div>
							<div className="ml-auto grid grid-cols-2 gap-4 mr-4">
								<span className="text-gray-700 flex">
									Posts {posts ? posts.length : 0}
								</span>
								{followersCount > 0 ? (
									<Link
										to={`/community/${username}/followers`}
										className="hover:underline"
									>
										<span className="text-gray-700">
											Followers {followersCount}
										</span>
									</Link>
								) : (
									<span className="text-gray-700">
										Followers {followersCount}
									</span>
								)}
							</div>
						</div>
					</div>
				</div>
			) : (
				<ProfileLoader />
			)}

			<div className="grid grid-cols-1 gap-4">
				{community ? (
					<Link to={`/community/${community.username}/createPost`}>
						<button className="mx-auto font-semibold bg-yellow-500 text-dark w-1/3 py-4 rounded-lg flex items-center justify-center focus:shadow-outline focus:outline-none">
							<span className="mx-auto uppercase">
								Create Post
							</span>
						</button>
					</Link>
				) : null}
				{posts ? (
					posts.length > 0 ? (
						posts.map((post) => {
							return (
								<PostItem
									key={post._id}
									title={post.title}
									body={post.body}
									id={post._id}
									upvotes={post.upvotes}
									downvotes={post.downvotes}
									author={post.author.username}
									community={
										post.community
											? post.community.username
											: null
									}
									communityprofilePicture={
										post.community
											? post.community.profilePicture
											: null
									}
									createdAt={post.createdAt}
									profilePicture={post.author.profilePicture}
								/>
							);
						})
					) : (
						<p className="m-auto my-10 text-xl uppercase">
							No Posts Yet
						</p>
					)
				) : (
					<PostLoader />
				)}
			</div>
		</div>
	);
};

export default Community;
