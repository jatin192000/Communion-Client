import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import "../Posts/post.css";
import { useHistory } from "react-router-dom";
import AuthService from "../../Services/AuthService";

const Followers = (props) => {
	let history = useHistory();

	const authContext = useContext(AuthContext);
	const [profile, setProfile] = useState("");
	const [following, setFollowing] = useState(false);
	useEffect(() => {
		AuthService.get(props.username).then((data) => {
			if (
				data.followers !== undefined &&
				data.followers.includes(authContext.user._id)
			) {
				setFollowing(true);
			} else {
				setFollowing(false);
			}
			if (data.profilePicture) {
				setProfile(data.profilePicture);
			}
		});
	});
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
		<div className="post-bar mx-auto">
			<div className="post-top">
				<Link to={`/user/${props.username}`}>
					<img
						src={`/Images/${profile}`}
						className="post-image"
						alt="profile-pic"
					/>
					<div className="post-username">
						<h3>{props.username}</h3>
					</div>
				</Link>
				{!following ? (
					<button className="btn-follow" onClick={Click}>
						Follow
					</button>
				) : (
					<button className="btn-following" onClick={Click}>
						Following
					</button>
				)}
			</div>
			<div className="post-bottom"></div>
		</div>
	);
};

export default Followers;
