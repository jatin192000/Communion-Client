import React, { useState, useContext, useEffect } from "react";
import AuthService from "../../Services/AuthService";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { useParams } from "react-router";
const PF = "/Images/";

const EditProfile = (props) => {
	const authContext = useContext(AuthContext);
	const id = authContext.user._id;
	const username = authContext.user.username;
	if (username !== useParams().username) {
		props.history.push("/");
	}
	const [user, setUser] = useState({
		name: "",
		bio: "",
		website: "",
		location: "",
	});
	const [profilePic, setProfilePic] = useState(
		authContext.user.profilePicture
	);
	const [coverPic, setCoverPic] = useState(authContext.user.coverPicture);

	useEffect(() => {
		AuthService.get(username).then((data) => {
			if (data.success) {
				setUser(data.user);
			}
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
	const handleProfilePic = (e) => {
		setProfilePic(e.target.files[0]);
	};

	const picSubmit = async (e) => {
		e.preventDefault();
		if (typeof profilePic === "string") {
			toast.error("Please Select a file to upload");
		} else {
			const formData = new FormData();
			formData.append("profile", profilePic);
			const res = await axios.post("/user/uploadProfile", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			if (res.data.success) {
				toast.success(res.data.message);
				window.location.reload();
			} else {
				toast.error(res.data.message);
			}
		}
	};
	const hiddenProfileInput = React.useRef(null);
	const onInvisibleProfileInput = (event) => {
		hiddenProfileInput.current.click();
	};
	const handleCoverPic = (e) => {
		setCoverPic(e.target.files[0]);
	};

	const coverSubmit = async (e) => {
		if (typeof coverPic === "string") {
			toast.error("Please Select a file to upload");
		} else {
			const formData1 = new FormData();
			formData1.append("cover", coverPic);
			const res = await axios.post("/user/uploadCover", formData1, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			if (res.data.success) {
				toast.success(res.data.message);
				window.location.reload();
			} else {
				toast.error(res.data.message);
			}
		}
	};

	const hiddenCoverInput = React.useRef(null);

	const onInvisibleCoverInput = (event) => {
		hiddenCoverInput.current.click();
	};

	return (
		<div className="profile bg-white mb-5">
			<ToastContainer />
			<div className="profileRight">
				<div className="profileRightTop">
					<div className="grid grid-cols-1 gap-4">
						<div className="grid grid-cols-3">
							<input
								type="file"
								name="coverUpload"
								className="profileUpload"
								accept=".png, .jpg, .jpeg"
								onChange={handleCoverPic}
								ref={hiddenCoverInput}
							/>
							<img
								src={PF + coverPic}
								className="coverBtn  col-span-2"
								alt="uploader"
								onClick={onInvisibleCoverInput}
							/>

							<button
								onClick={coverSubmit}
								className="btn-follow m-auto"
							>
								Upload
							</button>
						</div>
						<div className="grid grid-cols-3">
							<input
								type="file"
								name="profileUpload"
								className="profileUpload"
								accept=".png, .jpg, .jpeg"
								onChange={handleProfilePic}
								ref={hiddenProfileInput}
							/>
							<img
								src={PF + profilePic}
								className="profileBtn m-auto col-span-2"
								alt="uploader"
								onClick={onInvisibleProfileInput}
							/>
							<button
								onClick={picSubmit}
								className="btn-follow m-auto"
							>
								Upload
							</button>
						</div>
					</div>
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
