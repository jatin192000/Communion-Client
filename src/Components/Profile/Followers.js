import React, { useState, useEffect } from "react";
import Follow from "./Follow";
import AuthService from "../../Services/AuthService";
import { useParams } from "react-router";

const Followers = (props) => {
	const username = useParams().username;
	const [followers, setFollowers] = useState([]);
	useEffect(() => {
		AuthService.getFollowers(username).then((data) => {
			if (data) {
				setFollowers(data.followers);
			}
		});
	}, [username]);

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8">
			{followers.map((v1) => {
				return <Follow key={v1} id={v1} username={username} />;
			})}
		</div>
	);
};

export default Followers;
