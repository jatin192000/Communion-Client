import React, { useState, useEffect } from "react";
import Follow from "./Follow";
import AuthService from "../../Services/AuthService";
import { useParams } from "react-router";

const Followers = (props) => {
	const username = useParams().username;
	const [followers, setFollowers] = useState([]);
	useEffect(() => {
		if (username) {
			AuthService.getFollowers(username).then((data) => {
				if (data.success) {
					if (
						window.location.pathname ===
						`/user/followers/${username}`
					)
						setFollowers(data.followers);
					else setFollowers(data.following);
				}
			});
		}
	}, [username]);

	return (
		<div className="grid grid-cols-1">
			{followers
				? followers.map((v1) => {
						return <Follow key={v1} id={v1} />;
				  })
				: null}
		</div>
	);
};

export default Followers;
