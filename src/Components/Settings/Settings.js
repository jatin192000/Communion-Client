import React, { useEffect, useRef, useContext, useState } from "react";
import "../Profile/profile.css";
import { Link } from "react-router-dom";
import AuthService from "../../Services/AuthService";
import { AuthContext } from "../../Context/AuthContext";
import { ToastContainer, toast } from "react-toastify";

const Settings = (props) => {
	let timerID = useRef(null);
	const [showModal1, setShowModal1] = useState(false);
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
				onClick={() => setShowModal1(!showModal1)}
				className="px-8 py-4 cursor-pointer text-center text-sm md:text-lg rounded-lg text-base font-medium tracking-wide bg-red-300 border border-red-500 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white hover:bg-red-600 hover:text-white mt-8"
			>
				Delete Account
			</div>
			<div className={showModal1 ? "modal active" : "modal"}>
				<h2 className="font-medium text-lg text-center">
					Delete Account ?
				</h2>
				<p className="text-center px-5 py-2">
					Are you sure you want to delete your Account because after
					this action you won't be able to recover it.
				</p>
				<div className="grid grid-cols-2">
					<button
						onClick={() => setShowModal1(!showModal1)}
						className="px-6 py-3 cursor-pointer text-center text-xs rounded-full bg-gray-100 text-base font-normal tracking-wide focus:outline-none hover:bg-gray-200 m-2"
					>
						Close
					</button>
					<button
						onClick={deleteUser}
						className="px-6 py-3 cursor-pointer text-center text-xs rounded-full bg-red-600 text-base font-normal tracking-wide text-white focus:outline-none hover:bg-red-700 m-2"
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default Settings;
