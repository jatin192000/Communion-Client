import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import "../Posts/post.css";
import CommunityService from "../../Services/CommunityService";

const CommunityList = (props) => {
	const [username, setUsername] = useState("");
	const authContext = useContext(AuthContext);
	const [profile, setProfile] = useState("");

	useEffect(() => {
		CommunityService.getById(props.id).then((data) => {
			if (data.success) {
				setUsername(data.community.username);
				setProfile(data.community.profilePicture);
			}
		});
	}, [authContext.user._id, props.id]);

	return (
		<div className="follow-bar my-auto">
			<div className="post-top  grid grid-cols-2">
				<Link to={`/settings/community/${username}`}>
					<img
						src={`/Images/${profile}`}
						className="post-image"
						alt="profile-pic"
					/>
					<div className="post-username mt-2">
						<h3>{username}</h3>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default CommunityList;
