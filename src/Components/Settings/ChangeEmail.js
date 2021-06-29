import React, { useState, useRef, useEffect } from "react";
import "../Profile/profile.css";
import { ToastContainer, toast } from "react-toastify";
import AuthService from "../../Services/AuthService";
import validator from "../../validators/Validations";

const ChangeEmail = (props) => {
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [confirmEmail, setConfirmEmail] = useState("");
	let timerID = useRef(null);

	useEffect(() => {
		return () => {
			clearTimeout(timerID);
		};
	}, []);

	const changeEmail = (e) => {
		e.preventDefault();
		if (!validator.validateEmail(email)) {
			toast.info("Invalid Email");
		} else if (email !== confirmEmail) {
			toast.error("Emails do not match");
		} else {
			AuthService.changeEmail({
				password: password,
				email: email,
			}).then((data) => {
				if (data.success) {
					toast.success("Email changed");
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
			<h1 className="text-2xl font-normal text-center">Change Email</h1>
			<form onSubmit={changeEmail}>
				<input
					className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
					type="password"
					name="password"
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<input
					className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
					type="email"
					name="email"
					placeholder="New Email"
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<input
					className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
					type="email"
					name="confirmEmail"
					placeholder="Confirm Email"
					onChange={(e) => setConfirmEmail(e.target.value)}
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

export default ChangeEmail;
