import React from "react";
import "../Profile/profile.css";
import { Link, useParams } from "react-router-dom";

const CommunitySettings = (props) => {
	const username = useParams().username;
	return (
		<div className="grid grid-cols-1 w-1/3 mx-auto my-10">
			<Link to={`/settings/community/${username}/changeModerator`}>
				<li className="px-8 py-4 text-center rounded-lg text-base font-medium tracking-wide bg-pink-300 border border-pink-500 placeholder-gray-500 focus:outline-none focus:border-pink-400 focus:bg-white hover:bg-pink-600 hover:text-white mt-8">
					<span className="text-sm md:text-lg">
						Add / Remove Moderators
					</span>
				</li>
			</Link>

			<Link to={`/settings/community/${username}/changeAdmin`}>
				<li className="px-8 py-4 text-center rounded-lg text-base font-medium tracking-wide bg-purple-300 border border-purple-500 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white hover:bg-purple-600 hover:text-white mt-8">
					<span className="text-sm md:text-lg">
						Add / Remove Admins
					</span>
				</li>
			</Link>
		</div>
	);
};

export default CommunitySettings;
