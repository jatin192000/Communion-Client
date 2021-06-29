import React, { useState, useEffect, useContext } from "react";
import CommunityList from "./CommunityList";
import AuthService from "../../Services/AuthService";
import { AuthContext } from "../../Context/AuthContext";

const Communities = (props) => {
	const authContext = useContext(AuthContext);
	const username = authContext.user.username;
	const [communities, setCommunities] = useState([]);
	useEffect(() => {
		if (username) {
			AuthService.get(username).then((data) => {
				if (data.success) {
					setCommunities(data.user.communities);
				}
			});
		}
	}, [username]);

	return (
		<div className="grid grid-cols-1">
			{communities
				? communities.map((v1) => {
						return <CommunityList key={v1} id={v1} />;
				  })
				: null}
		</div>
	);
};

export default Communities;
