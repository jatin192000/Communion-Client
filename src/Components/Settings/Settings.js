import React, { useEffect, useRef, useContext } from "react";
import "../Profile/profile.css";
import { Link } from "react-router-dom";
import AuthService from "../../Services/AuthService";
import { AuthContext } from "../../Context/AuthContext";
import { ToastContainer, toast } from "react-toastify";

const Settings = (props) => {
	let timerID = useRef(null);
	const authContext = useContext(AuthContext);
	useEffect(() => {
		return () => {
			clearTimeout(timerID);
		};
	}, []);

	const deleteUser = () => {
		if (authContext.isAuthenticated) {
			AuthService.delete(authContext.user._id).then((data) => {
				if (data.success) {
					toast.success("User successfully deleted");
					timerID = setTimeout(() => {
						window.location.reload();
					}, 2000);
				} else {
					toast.success("Some error occurred during deleting user");
				}
			});
		}
	};

	return (
		<div className="grid grid-cols-1 w-1/3 mx-auto my-10">
			<ToastContainer />
			<Link to="/settings/changePassword">
				<li className="px-8 py-4 text-center rounded-lg text-base font-medium tracking-wide bg-indigo-300 border border-indigo-500 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white hover:bg-indigo-600 hover:text-white mt-8">
					<span className="text-sm md:text-lg">Change Password</span>
				</li>
			</Link>

			<Link to="/settings/changeEmail">
				<li className="px-8 py-4 text-center rounded-lg text-base font-medium tracking-wide bg-blue-300 border border-blue-500 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white hover:bg-blue-600 hover:text-white mt-8">
					<span className="text-sm md:text-lg">Change Email</span>
				</li>
			</Link>
			<Link to="/settings/communities">
				<li className="px-8 py-4 text-center rounded-lg text-base font-medium tracking-wide bg-green-300 border border-green-500 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white hover:bg-green-600 hover:text-white mt-8">
					<span className="text-sm md:text-lg">
						Community Settings
					</span>
				</li>
			</Link>
			<div
				onClick={deleteUser}
				className="px-8 py-4 cursor-pointer text-center text-sm md:text-lg rounded-lg text-base font-medium tracking-wide bg-red-300 border border-red-500 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white hover:bg-red-600 hover:text-white mt-8"
			>
				Delete Account
			</div>
		</div>
	);
};

export default Settings;
