import React, { useState, useEffect, useContext } from "react";
import CommunityService from "../../Services/CommunityService";
import "./profile.css";
import PostItem from "../Posts/PostItem";
import PostService from "../../Services/PostService";
import { useParams } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
const PF = "/Images/";

const Community = () => {
	const [user, setUser] = useState({});
	const username = useParams().username;
	const [posts, setPosts] = useState([]);
	const [following, setFollowing] = useState(true);
	const [followersCount, setFollowersCount] = useState(0);
	const authContext = useContext(AuthContext);
	useEffect(() => {
		CommunityService.get(username).then((data) => {
			console.log(data);
			setUser(data.communities);
			setFollowersCount(data.communities.followers.length);
			if (
				data.communities.followers !== undefined &&
				data.communities.followers.includes(authContext.user._id)
			) {
				setFollowing(true);
			} else {
				setFollowing(false);
			}
		});

		PostService.getCommunityDashboardPosts(username).then((data) => {
			setPosts(data.posts);
		});
	}, [username]);

	const followUser = async () => {
		try {
			await CommunityService.follow(user._id).then((data) => {
				if (data.success) {
					if (data.message === "User has been unfollowed") {
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
		<>
			<div className="profile">
				<div className="profileRight">
					<div className="profileRightTop">
						<div className="profileCover">
							<img
								className="profileCoverImg"
								src={
									user.coverPicture
										? PF + user.coverPicture
										: PF + "noCover.png"
								}
								alt=""
							/>
							<img
								className="profileUserImg"
								src={
									user.profilePicture
										? PF + user.profilePicture
										: PF + "avatar.png"
								}
								alt=""
							/>
							<div className="btn">
								{authContext.user.username === user.username ? (
									<Link
										to={`/user/${username}/editProfile`}
										className="btn-editprofile"
									>
										Edit Profile
									</Link>
								) : following ? (
									<button
										onClick={followUser}
										className="btn-following"
									>
										Following
									</button>
								) : (
									<button
										onClick={followUser}
										className="btn-follow"
									>
										Follow
									</button>
								)}
							</div>
						</div>
						<div className="profileInfo">
							<h4 className="profileInfoName">{user.name}</h4>
							<span className="profileInfoDesc">
								@{user.username}
							</span>
						</div>
						<span className="profileInfoDesc">{user.bio}</span>
						<span className="profileInfoDesc">
							Followers: {followersCount}
						</span>
					</div>
				</div>
			</div>
			<div>
				{posts
					? posts.map((post) => {
							return (
								<PostItem
									key={post._id}
									title={post.title}
									body={post.body}
									id={post._id}
									upvotes={post.upvotes}
									downvotes={post.downvotes}
									author={post.author}
									community={post.community}
									createdAt={post.createdAt}
								/>
							);
					  })
					: null}
			</div>
		</>
	);
};

export default Community;
