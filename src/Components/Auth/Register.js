import React, { useState, useRef, useEffect } from "react";
import AuthService from "../../Services/AuthService";
import { ToastContainer, toast } from "react-toastify";
import authSvg from "./register.svg";
import Validator from "../../validators/Validations";

const Register = (props) => {
	const [user, setUser] = useState({ username: "", email: "", password: "" });
	const [confirmPassword, setConfirmPassword] = useState("");
	let timerID = useRef(null);

	useEffect(() => {
		return () => {
			clearTimeout(timerID);
		};
	}, []);

	const onChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const resetForm = () => {
		setUser({ username: "", email: "", password: "" });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const v1 = Validator.validateUsername(user.username);
		const v2 = Validator.validateEmail(user.email);
		const v3 = user.password.length > 7;
		if (v1 && v2 && v3 && user.password === confirmPassword) {
			try {
				AuthService.register(user).then((data) => {
					resetForm();
					if (!data.success) {
						toast.error(data.message);
					} else {
						toast.success(data.message);
						timerID = setTimeout(() => {
							props.history.push("/login");
						}, 2000);
					}
				});
			} catch (error) {
				toast.error(error.message);
			}
		} else if (!v1) {
			toast.info(
				"Username can only have alphanumeric characters, underscore and dot are allowed but not at the start and end"
			);
		} else if (!v2) {
			toast.error("Invalid Email");
		} else if (!v3) {
			toast.info("Your password must be at least 8 characters long");
		} else {
			toast.error("Passwords Don't Match");
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
			<ToastContainer />
			<div className="max-w-screen-xl m-0 bg-white shadow sm:rounded-lg flex justify-center flex-1">
				<div className="lg:w-1/2 xl:w-5/12 p-6">
					<div className="mt-12 flex flex-col items-center">
						<h1 className="text-2xl xl:text-3xl font-semibold">
							Sign Up
						</h1>

						<form
							className="w-full flex-1 mt-8 text-black"
							onSubmit={onSubmit}
						>
							<div className="mx-auto max-w-xs relative ">
								<input
									className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
									type="text"
									name="username"
									placeholder="username"
									onChange={onChange}
									required
									autoComplete
								/>
								<input
									className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 "
									type="email"
									name="email"
									placeholder="Email"
									onChange={onChange}
									required
									autoComplete
								/>
								<input
									className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
									type="password"
									name="password"
									placeholder="Password"
									onChange={onChange}
									required
								/>
								<input
									className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
									type="password"
									name="confirmPassword"
									placeholder="Confirm Password"
									onChange={(e) =>
										setConfirmPassword(e.target.value)
									}
									required
								/>
								<span
									class="text-xs text-gray-600"
									id="passwordHelp"
								>
									Your password must be at least 8 characters
									long.
								</span>
								<button
									type="submit"
									className="mt-5 tracking-wide font-semibold bg-yellow-500 text-black w-full py-4 rounded-lg flex items-center justify-center focus:shadow-outline focus:outline-none"
								>
									<span className="uppercase">Register</span>
								</button>
							</div>
						</form>
					</div>
				</div>
				<div className="flex-1 bg-gray-100 text-center hidden lg:flex">
					<div
						className="mx-6 w-full bg-contain bg-center bg-no-repeat"
						style={{ backgroundImage: `url(${authSvg})` }}
					></div>
				</div>
			</div>
		</div>
	);
};

export default Register;
