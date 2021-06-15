import React, { useEffect, useContext } from "react";
import { useStateIfMounted } from "use-state-if-mounted";
import AuthService from "../../Services/AuthService";
import "./profile.css";
import PostItem from "../Posts/PostItem";
import PostService from "../../Services/PostService";
import { useParams } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import PostLoader from "../Loaders/PostLoader";
import ProfileLoader from "../Loaders/ProfileLoader";

const PF = "/Images/";

const Profile = (props) => {
	const [user, setUser] = useStateIfMounted(null);
	const username = useParams().username;
	const [posts, setPosts] = useStateIfMounted(null);
	const [following, setFollowing] = useStateIfMounted(false);
	const [followersCount, setFollowersCount] = useStateIfMounted(0);
	const [followingCount, setFollowingCount] = useStateIfMounted(0);
	const authContext = useContext(AuthContext);
	useEffect(() => {
		AuthService.get(username).then((data) => {
			if (data.success) {
				setUser(data.user);
				if (data.user.followers && data.user.following) {
					setFollowingCount(data.user.following.length);
					setFollowersCount(data.user.followers.length);
				}
				if (
					data.user.followers !== undefined &&
					data.user.followers.includes(authContext.user._id)
				) {
					setFollowing(true);
				} else {
					setFollowing(false);
				}
			} else {
				props.history.push("/Error");
			}
		});

		PostService.getDashboardPosts(username).then((data) => {
			setPosts(data.posts);
		});
	}, []);

	if (posts) {
		posts.sort((p1, p2) => {
			return new Date(p2.createdAt) - new Date(p1.createdAt);
		});
	}

	const followUser = async () => {
		try {
			await AuthService.follow(user._id).then((data) => {
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
		<div className="gap-4">
			{user ? (
				<div className="profile bg-white mb-5">
					<div className="profileRight">
						<div className="profileRightTop">
							<div className="profileCover">
								<img
									className="profileCoverImg"
									src={PF + user.coverPicture}
									alt=""
								/>
								<img
									className="profileUserImg"
									src={PF + user.profilePicture}
									alt=""
								/>
								<div className="btn">
									{authContext.user.username ===
									user.username ? (
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
						</div>
						<>
							<div className="profileInfo">
								<h4 className="profileInfoName">{user.name}</h4>
								<span className="font-normal text-gray-600">
									@{user.username}
								</span>
							</div>
							<div className="grid grid-cols-2 p-3">
								<div className="grid grid-cols-1">
									<span className="text-gray-700 ml-3">
										{user.bio}
									</span>
									<span className="flex text-gray-700">
										{user.location ? (
											<>
												<svg
													viewBox="0 0 24 24"
													aria-hidden="true"
													className="link my-auto mx-2"
												>
													<g>
														<path d="M12 14.315c-2.088 0-3.787-1.698-3.787-3.786S9.913 6.74 12 6.74s3.787 1.7 3.787 3.787-1.7 3.785-3.787 3.785zm0-6.073c-1.26 0-2.287 1.026-2.287 2.287S10.74 12.814 12 12.814s2.287-1.025 2.287-2.286S13.26 8.24 12 8.24z"></path>
														<path d="M20.692 10.69C20.692 5.9 16.792 2 12 2s-8.692 3.9-8.692 8.69c0 1.902.603 3.708 1.743 5.223l.003-.002.007.015c1.628 2.07 6.278 5.757 6.475 5.912.138.11.302.163.465.163.163 0 .327-.053.465-.162.197-.155 4.847-3.84 6.475-5.912l.007-.014.002.002c1.14-1.516 1.742-3.32 1.742-5.223zM12 20.29c-1.224-.99-4.52-3.715-5.756-5.285-.94-1.25-1.436-2.742-1.436-4.312C4.808 6.727 8.035 3.5 12 3.5s7.192 3.226 7.192 7.19c0 1.57-.497 3.062-1.436 4.313-1.236 1.57-4.532 4.294-5.756 5.285z"></path>
													</g>
												</svg>
												<span>{user.location}</span>
											</>
										) : null}
										{user.website ? (
											<a href={`https://${user.website}`}>
												<svg
													viewBox="0 0 24 24"
													aria-hidden="true"
													className="link my-auto mx-2"
												>
													<g>
														<path d="M11.96 14.945c-.067 0-.136-.01-.203-.027-1.13-.318-2.097-.986-2.795-1.932-.832-1.125-1.176-2.508-.968-3.893s.942-2.605 2.068-3.438l3.53-2.608c2.322-1.716 5.61-1.224 7.33 1.1.83 1.127 1.175 2.51.967 3.895s-.943 2.605-2.07 3.438l-1.48 1.094c-.333.246-.804.175-1.05-.158-.246-.334-.176-.804.158-1.05l1.48-1.095c.803-.592 1.327-1.463 1.476-2.45.148-.988-.098-1.975-.69-2.778-1.225-1.656-3.572-2.01-5.23-.784l-3.53 2.608c-.802.593-1.326 1.464-1.475 2.45-.15.99.097 1.975.69 2.778.498.675 1.187 1.15 1.992 1.377.4.114.633.528.52.928-.092.33-.394.547-.722.547z"></path>
														<path d="M7.27 22.054c-1.61 0-3.197-.735-4.225-2.125-.832-1.127-1.176-2.51-.968-3.894s.943-2.605 2.07-3.438l1.478-1.094c.334-.245.805-.175 1.05.158s.177.804-.157 1.05l-1.48 1.095c-.803.593-1.326 1.464-1.475 2.45-.148.99.097 1.975.69 2.778 1.225 1.657 3.57 2.01 5.23.785l3.528-2.608c1.658-1.225 2.01-3.57.785-5.23-.498-.674-1.187-1.15-1.992-1.376-.4-.113-.633-.527-.52-.927.112-.4.528-.63.926-.522 1.13.318 2.096.986 2.794 1.932 1.717 2.324 1.224 5.612-1.1 7.33l-3.53 2.608c-.933.693-2.023 1.026-3.105 1.026z"></path>
													</g>
												</svg>
											</a>
										) : null}
									</span>
								</div>
								<div className="ml-auto grid grid-cols-3 gap-4 mr-4">
									<span className="text-gray-700 flex">
										Posts {posts ? posts.length : 0}
									</span>
									{followersCount > 0 ? (
										<Link
											to={`/user/followers/${user.username}`}
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
									{followingCount ? (
										<Link
											to={`/user/following/${user.username}`}
											className="hover:underline"
										>
											<span className="text-gray-700">
												Following {followingCount}
											</span>
										</Link>
									) : (
										<span className="text-gray-700">
											Following {followingCount}
										</span>
									)}
								</div>
							</div>
						</>
					</div>
				</div>
			) : (
				<ProfileLoader />
			)}

			<div className="grid grid-cols-1">
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
						<p className="m-auto mt-10 text-xl uppercase">
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

export default Profile;
