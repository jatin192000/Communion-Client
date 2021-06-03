import React, { useState, useEffect } from "react";
import Follow from "./Follow";
import AuthService from "../../Services/AuthService";
import { useParams } from "react-router";

const Following = () => {
	const username = useParams().username;
	const [following, setFollowing] = useState([]);
	useEffect(() => {
		AuthService.getFollowers(username).then((data) => {
			if (data) {
				setFollowing(data.following);
			}
		});
	}, [username]);

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8">
			{following.map((v1) => {
				return <Follow key={v1} id={v1} username={username} />;
			})}
		</div>
	);
};

export default Following;
