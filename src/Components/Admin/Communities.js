import React, { useState, useEffect } from "react";
import CommunitiesList from "./CommunitiesList";
import CommunityService from "../../Services/CommunityService";

const Communities = (props) => {
	const [communities, setCommunities] = useState(null);

	useEffect(() => {
		CommunityService.getAll().then((data) => {
			setCommunities(data.communities);
		});
	}, []);

	return (
		<div className="grid grid-cols-1">
			{communities
				? communities.map((v1) => {
						return (
							<CommunitiesList
								key={v1._id}
								id={v1._id}
								createdOn={v1.createdAt}
								profilePicture={v1.profilePicture}
								username={v1.username}
								followers={v1.followers.length}
							/>
						);
				  })
				: null}
		</div>
	);
};

export default Communities;
