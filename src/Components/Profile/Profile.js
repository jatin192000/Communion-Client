import React, { useState, useEffect, useContext } from "react";
import AuthService from "../../Services/AuthService";
import "./profile.css";
import PostItem from "../Posts/PostItem";
import PostService from "../../Services/PostService";
import { useParams } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
const PF = "/Images/";

export default function Profile() {
	const username = useParams().username;
	const [user, setUser] = useState({});
	const [posts, setPosts] = useState([]);
	const [following, setFollowing] = useState(true);
	const [isLoading, setIsLoading] = useState(true);
	const authContext = useContext(AuthContext);
	useEffect(() => {
		setUser(async (user) => {
			let newUser = await AuthService.get(username);
			//console.log(newUser);
			if (
				newUser.followers !== undefined &&
				newUser.followers.includes(authContext.user._id)
			) {
				setFollowing(true);
			} else {
				setFollowing(false);
			}
			PostService.getDashboardPosts(username).then((data) => {
				setPosts(data.posts);
			});
			setIsLoading(false);
			return newUser;
		});
	}, []);
	if (isLoading) {
		return <div>Loading </div>;
	}

	console.log(user);
	const followUser = async () => {
		await AuthService.follow(user._id).then((data) => {
			if (data.success) {
				if (data.message === "User has been unfollowed") {
					setFollowing(false);
				} else {
					setFollowing(true);
				}
			}
		});
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
						</div>
						<div className="profileInfo">
							<h4 className="profileInfoName">{user.name}</h4>
							<span className="profileInfoDesc">
								@{user.username}
							</span>
						</div>
						<span className="profileInfoDesc">{user.bio}</span>
						{authContext.user.username === user.username ? (
							<Link to={`/user/${username}/editProfile`}>
								<button className="btn btn-primary rounded-pill">
									Edit Profile
								</button>
							</Link>
						) : false ? (
							<button
								onClick={followUser}
								className="btn-following"
							>
								Following
							</button>
						) : (
							<button onClick={followUser} className="btn-follow">
								Follow
							</button>
						)}
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
								/>
							);
					  })
					: null}
			</div>
		</>
	);
}
