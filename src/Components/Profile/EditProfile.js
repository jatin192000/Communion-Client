import React, { useState, useContext, useEffect } from "react";
import AuthService from "../../Services/AuthService";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";

const EditProfile = (props) => {
	const authContext = useContext(AuthContext);
	const id = authContext.user._id;
	const username = authContext.user.username;
	const [user, setUser] = useState({
		name: "",
		bio: "",
		website: "",
		location: "",
	});
	// const [profilePic, setProfilePic] = useState("");
	// const [coverPic, setCoverPic] = useState("");

	// const handleProfilePic = (e) => {
	// 	setProfilePic(e.target.files[0]);
	// };
	// console.log(profilePic);
	// const handleCoverPic = (e) => {
	// 	setCoverPic(e.target.files[1]);
	// };

	// const profileUpload = (profilePic) => {
	// 	const formData = new FormData();
	// 	formData.append("profile", profilePic);
	// 	AuthService.uploadProfile(authContext.user._id, formData).then(
	// 		(data) => {
	// 			if (!data.success) {
	// 				toast.error(data.message, {
	// 					position: "top-right",
	// 					autoClose: 5000,
	// 					hideProgressBar: false,
	// 					closeOnClick: true,
	// 					pauseOnHover: true,
	// 					draggable: true,
	// 					progress: undefined,
	// 				});
	// 			} else {
	// 				toast.success(data.message, {
	// 					position: "top-right",
	// 					autoClose: 5000,
	// 					hideProgressBar: false,
	// 					closeOnClick: true,
	// 					pauseOnHover: true,
	// 					draggable: true,
	// 					progress: undefined,
	// 				});
	// 			}
	// 		}
	// 	);
	// };
	useEffect(() => {
		AuthService.get(username).then((data) => {
			setUser(data);
		});
	}, [username]);
	const onChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		AuthService.update({ user, id }).then((data) => {
			if (!data.success) {
				toast.error(data.message);
			} else {
				toast.success(data.message);
			}
		});
	};

	return (
		<div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
			<ToastContainer />
			<div className="max-w-screen-xl m-0 bg-white shadow sm:rounded-lg flex justify-center flex-1">
				<div className="lg:w-1/2 xl:w-5/12 p-6">
					<form
						className="w-full flex-1 mt-8 text-black"
						onSubmit={onSubmit}
					>
						<div className="mx-auto max-w-xs relative ">
							<input
								className="w-full px-8 py-4 rounded-lg font-medium bg-white-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
								type="text"
								name="name"
								placeholder="Name"
								value={user.name}
								onChange={onChange}
							/>
							<textarea
								className="h-50 resize-y w-full px-8 py-4 rounded-lg font-medium bg-white-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
								name="bio"
								type="textbox"
								value={user.bio}
								onChange={onChange}
								placeholder="Bio"
							/>
							<input
								className="w-full px-8 py-4 rounded-lg font-medium bg-white-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
								type="text"
								name="location"
								placeholder="Location"
								value={user.location}
								onChange={onChange}
							/>
							<input
								className="w-full px-8 py-4 rounded-lg font-medium bg-white-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
								type="text"
								name="website"
								placeholder="Website"
								value={user.website}
								onChange={onChange}
							/>
							<button
								type="submit"
								className="mt-5 tracking-wide font-semibold bg-yellow-500 text-black w-full py-4 rounded-lg flex items-center justify-center focus:shadow-outline focus:outline-none"
							>
								<span className="uppercase">Update</span>
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default EditProfile;
