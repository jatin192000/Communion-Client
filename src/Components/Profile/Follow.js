import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import "../Posts/post.css";
import { useHistory } from "react-router-dom";
import AuthService from "../../Services/AuthService";

const Follow = (props) => {
	let history = useHistory();
	const [username, setUsername] = useState("");
	const authContext = useContext(AuthContext);
	const [profile, setProfile] = useState("");
	const [following, setFollowing] = useState(false);
	useEffect(() => {
		AuthService.getById(props.id).then((data) => {
			if (data.success) {
				setUsername(data.user.username);
				if (data.user.followers.includes(authContext.user._id)) {
					setFollowing(true);
				} else {
					setFollowing(false);
				}
				setProfile(data.user.profilePicture);
			}
		});
	}, [authContext.user._id, props.id]);

	const Click = async () => {
		if (authContext.user.username) {
			try {
				await AuthService.follow(props.id).then((data) => {
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
		} else {
			history.push("/");
		}
	};
	return (
		<div className="follow-bar my-auto">
			<div className="post-top  grid grid-cols-2">
				<Link to={`/user/${username}`}>
					<img
						src={`/Images/${profile}`}
						className="post-image"
						alt="profile-pic"
					/>
					<div className="post-username mt-2">
						<h3>{username}</h3>
					</div>
				</Link>
				{username === authContext.user.username ? null : !following ? (
					<button className="btn-follow max-w-sm" onClick={Click}>
						Follow
					</button>
				) : (
					<button className="btn-following max-w-sm" onClick={Click}>
						Following
					</button>
				)}
			</div>
		</div>
	);
};

export default Follow;
