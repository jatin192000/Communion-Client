import React, { useState, useEffect } from "react";
import Top from "./Top";
import CommunityService from "../../Services/CommunityService";

const TopCommunities = (props) => {
	const [communities, setCommunities] = useState(null);
	useEffect(() => {
		CommunityService.getAll().then((data) => {
			setCommunities(data.communities);
		});
	}, []);
	let pos = 1;
	if (communities) {
		communities.sort((p1, p2) => {
			return p2.followers.length - p1.followers.length;
		});
	}
	return (
		<div className="grid grid-cols-1">
			{communities ? (
				communities.length ? (
					communities.map((v1) => {
						return (
							<Top
								key={v1._id}
								position={pos++}
								profilePicture={v1.profilePicture}
								username={v1.username}
								followers={v1.followers.length}
							/>
						);
					})
				) : (
					<p className="m-auto mt-10 text-xl uppercase">
						No Communities Yet
					</p>
				)
			) : null}
		</div>
	);
};

export default TopCommunities;
