import React, { useState, useEffect, useContext } from "react";
import CommunityList from "./CommunityList";
import AuthService from "../../Services/AuthService";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";

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
			<Link to="/createCommunity">
				<button className="my-5 mx-auto tracking-wide font-semibold bg-yellow-500 text-black p-4 rounded-lg flex items-center justify-center focus:shadow-outline focus:outline-none">
					<span className="uppercase">Create Community</span>
				</button>
			</Link>
			{communities
				? communities.map((v1) => {
						return <CommunityList key={v1} id={v1} />;
				  })
				: null}
		</div>
	);
};

export default Communities;
