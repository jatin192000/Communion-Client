import React from "react";
import { Link } from "react-router-dom";
import "../Posts/post.css";

const Top = (props) => {
	return (
		<div className="follow-bar my-auto">
			<div className="post-top  grid grid-cols-2">
				<Link to={`/community/${props.username}`}>
					<div className="post-username mt-2 mr-4">
						<h3>{props.position}</h3>
					</div>
					<img
						src={`/Images/${props.profilePicture}`}
						className="post-image"
						alt="profile-pic"
					/>
					<div className="post-username mt-2">
						<h3>{props.username}</h3>
					</div>
				</Link>
				<div className="post-username mt-2">
					<h3>Followers: {props.followers}</h3>
				</div>
			</div>
		</div>
	);
};

export default Top;
