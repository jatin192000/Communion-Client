import React, { useState, useContext } from "react";
import AuthService from "../../Services/AuthService";
import { AuthContext } from "../../Context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import authSvg from "./login.svg";
import { FiLogIn } from "react-icons/fi";
import "./Auth.css";

const Login = (props) => {
	const [user, setUser] = useState({ username: "", password: "" });
	const authContext = useContext(AuthContext);

	const onChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		try {
			AuthService.login(user).then((data) => {
				const { isAuthenticated, user } = data;
				if (isAuthenticated) {
					authContext.setUser(user);
					authContext.setIsAuthenticated(isAuthenticated);
					props.history.push("/posts");
					toast.success("Logged in Successfully", {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
				} else {
					toast.error("Invalid Credentials", {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
				}
			});
		} catch (error) {
			toast.error(error.message, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
			<ToastContainer />
			<div className="max-w-screen-xl m-0 bg-white shadow sm:rounded-lg flex justify-center flex-1">
				<div className="lg:w-1/2 xl:w-5/12 p-6">
					<div className="mt-12 flex flex-col items-center">
						<h1 className="text-2xl xl:text-3xl font-semibold">
							Sign In
						</h1>
						<div className="w-full flex-1 mt-8 text-black">
							<form
								className="mx-auto max-w-xs relative "
								onSubmit={onSubmit}
							>
								<input
									className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
									type="username"
									name="username"
									value={user.username}
									required
									placeholder="username"
									onChange={onChange}
								/>
								<input
									className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
									type="password"
									name="password"
									value={user.password}
									placeholder="Password"
									onChange={onChange}
									required
								/>
								<button
									type="submit"
									className="mt-5 tracking-wide font-semibold bg-yellow-500 text-black w-full py-4 rounded-lg flex items-center justify-center focus:shadow-outline focus:outline-none"
								>
									<FiLogIn />
									<span className="ml-3 uppercase">
										Sign In
									</span>
								</button>
								<Link
									to="/forgotpassword"
									className="no-underline text-indigo-500 text-md text-right absolute right-0  mt-2"
								>
									Forgot password?
								</Link>
							</form>
						</div>
					</div>
				</div>
				<div className="flex-1 bg-gray-100 text-center hidden lg:flex">
					<div
						className="w-8/12 mx-auto bg-contain bg-center bg-no-repeat"
						style={{ backgroundImage: `url(${authSvg})` }}
					></div>
				</div>
			</div>
		</div>
	);
};

export default Login;
