import React, { useState, useRef, useEffect } from "react";
import "../Profile/profile.css";
import { ToastContainer, toast } from "react-toastify";
import AuthService from "../../Services/AuthService";

const ChangePassword = (props) => {
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	let timerID = useRef(null);

	useEffect(() => {
		return () => {
			clearTimeout(timerID);
		};
	}, []);

	const changePassword = (e) => {
		e.preventDefault();
		if (newPassword.length < 8) {
			toast.info("Password Length cannot be less than 8");
		} else if (newPassword !== confirmPassword) {
			toast.error("Passwords do not match");
		} else {
			AuthService.changePassword({
				oldPassword: oldPassword,
				password: newPassword,
			}).then((data) => {
				if (data.success) {
					toast.success("password changed");
					timerID = setTimeout(() => {
						props.history.push("/settings");
					}, 2000);
				} else {
					toast.error(data.message);
				}
			});
		}
	};

	return (
		<div className="gap-4 w-1/3 mx-auto my-5">
			<ToastContainer />
			<h1 className="text-2xl font-normal text-center">
				Change Password
			</h1>
			<form onSubmit={changePassword}>
				<input
					className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
					type="password"
					name="oldpassword"
					placeholder="Old Password"
					onChange={(e) => setOldPassword(e.target.value)}
					required
				/>
				<input
					className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
					type="password"
					name="newpassword"
					placeholder="New Password"
					onChange={(e) => setNewPassword(e.target.value)}
					required
				/>
				<input
					className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
					type="password"
					name="confirmPassword"
					placeholder="Confirm Password"
					onChange={(e) => setConfirmPassword(e.target.value)}
					required
				/>
				<button
					type="submit"
					className="mt-5 tracking-wide font-semibold bg-yellow-500 text-black w-full py-4 rounded-lg flex items-center justify-center focus:shadow-outline focus:outline-none"
				>
					<span className="uppercase">Save</span>
				</button>
			</form>
		</div>
	);
};

export default ChangePassword;
