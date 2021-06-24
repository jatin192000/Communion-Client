import React, { useState, useEffect } from "react";
import Follow from "../Profile/Follow";
import { useParams } from "react-router";
import CommunityService from "../../Services/CommunityService";

const Followers = (props) => {
	const username = useParams().username;
	const [followers, setFollowers] = useState([]);
	useEffect(() => {
		if (username) {
			CommunityService.get(username).then((data) => {
				if (data.success) {
					setFollowers(data.community.followers);
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
