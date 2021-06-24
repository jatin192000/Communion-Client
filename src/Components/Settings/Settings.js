import React from "react";
import "../Profile/profile.css";
import { Link } from "react-router-dom";
const Settings = (props) => {
	return (
		<div className="grid grid-cols-1 w-1/3 mx-auto my-10">
			<Link to={`settings/changePassword`}>
				<li className="px-8 py-4 text-center rounded-lg text-base font-medium tracking-wide bg-indigo-300 border border-indigo-500 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white hover:bg-indigo-600 hover:text-white mt-8">
					<span className="text-sm md:text-lg">Change Password</span>
				</li>
			</Link>

			<Link to="/">
				<li className="px-8 py-4 text-center rounded-lg text-base font-medium tracking-wide bg-blue-300 border border-blue-500 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white hover:bg-blue-600 hover:text-white mt-8">
					<span className="text-sm md:text-lg">Change Email</span>
				</li>
			</Link>
			<Link to="/">
				<li className="px-8 py-4 text-center rounded-lg text-base font-medium tracking-wide bg-red-300 border border-red-500 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white hover:bg-red-600 hover:text-white mt-8">
					<span className="text-sm md:text-lg">Delete Account</span>
				</li>
			</Link>
		</div>
	);
};

export default Settings;
