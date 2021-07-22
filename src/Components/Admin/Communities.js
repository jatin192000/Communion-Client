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
			<div className="mx-auto font-normal text-3xl mb-2">Communities</div>
			<div className="post-bottom" />
			<div className="grid grid-cols-6 text-md md:text-lg p-5 pl-8 font-medium">
				<span>Community</span>
				<span>Followers</span>
				<span className="col-span-2">Created On</span>
				<span className="mx-auto">Delete</span>
				<span className="mx-auto">Redirect</span>
			</div>
			<div className="post-bottom mb-2" />
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
