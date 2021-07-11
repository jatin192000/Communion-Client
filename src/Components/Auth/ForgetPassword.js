import { useState } from "react";
import React from "react";
import AuthService from "../../Services/AuthService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authSvg from "./forgotpassword.svg";
import Validator from "../../validators/Validations";
const ForgotPassword = () => {
	const [email, setEmail] = useState("");

	const onSubmit = async (e) => {
		e.preventDefault();
		if (Validator.validateEmail(email)) {
			try {
				AuthService.forgotpassword(JSON.stringify({ email })).then(
					(data) => {
						if (data.success) {
							toast.success(data.message);
						} else {
							toast.error(data.message);
						}
					}
				);
			} catch (error) {
				toast.error(error.message);
			}
		} else {
			toast.error("Not a valid email");
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
			<ToastContainer />
			<div className="max-w-screen-xl m-0 bg-white shadow sm:rounded-lg flex justify-center flex-1">
				<div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
					<div className="mt-12 flex flex-col items-center">
						<h1 className="text-2xl xl:text-3xl font-semibold">
							Forgot Password
						</h1>
						<div className="w-full flex-1 mt-8 text-black">
							<form
								className="mx-auto max-w-xs relative "
								onSubmit={onSubmit}
							>
								<input
									className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
									type="email"
									name="email"
									required
									value={email}
									placeholder="Email"
									onChange={(e) => setEmail(e.target.value)}
									autoComplete
								/>
								<button
									type="submit"
									className="mt-5 tracking-wide font-semibold bg-yellow-500 text-black w-full py-4 rounded-lg flex items-center justify-center focus:shadow-outline focus:outline-none"
								>
									<span className="ml-3 uppercase">
										Send Email
									</span>
								</button>
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

export default ForgotPassword;
