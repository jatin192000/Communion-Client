import React, { useState, useContext } from "react";
import AuthService from "../../Services/AuthService";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";

const EditProfile = (props) => {
	const authContext = useContext(AuthContext);
	const [user, setUser] = useState({
		name: "",
		bio: "",
		website: "",
		location: "",
	});
	const [profilePic, setProfilePic] = useState("");
	const [coverPic, setCoverPic] = useState("");

	const handleProfilePic = (e) => {
		setProfilePic(e.target.files[0]);
	};
	console.log(profilePic);
	// const handleCoverPic = (e) => {
	// 	setCoverPic(e.target.files[1]);
	// };

	const profileUpload = (profilePic) => {
		const formData = new FormData();
		formData.append("profile", profilePic);
		// AuthService.uploadProfile(authContext.user._id, {
		// 	formData,
		// }).then((data) => {
		// 	if (!data.success) {
		// 		toast.error(data.message, {
		// 			position: "top-right",
		// 			autoClose: 5000,
		// 			hideProgressBar: false,
		// 			closeOnClick: true,
		// 			pauseOnHover: true,
		// 			draggable: true,
		// 			progress: undefined,
		// 		});
		// 	} else {
		// 		toast.success(data.message, {
		// 			position: "top-right",
		// 			autoClose: 5000,
		// 			hideProgressBar: false,
		// 			closeOnClick: true,
		// 			pauseOnHover: true,
		// 			draggable: true,
		// 			progress: undefined,
		// 		});
		// 	}
		// });
	};
	const onChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		AuthService.update(user, authContext.user._id).then((data) => {
			if (!data.success) {
				toast.error(data.message, {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			} else {
				toast.success(data.message, {
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
	};

	return (
		<div className="container">
			<ToastContainer />
			<form onSubmit={onSubmit}>
				<legend>Update</legend>
				<div className="mb-3">
					<label htmlFor="profilePic" className="form-label">
						Profile Pic
					</label>
					<input
						type="file"
						accept=".png, .jpg, .jpeg"
						name="profilePic"
						onChange={handleProfilePic}
						className="form-control"
					/>
					<button className="btn btn-primary" onClick={profileUpload}>
						Upload
					</button>
				</div>
				<div className="mb-3">
					<label htmlFor="name" className="form-label">
						Name
					</label>
					<input
						type="text"
						name="name"
						value={user.name}
						onChange={onChange}
						className="form-control"
						placeholder="Name"
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="bio" className="form-label">
						Bio
					</label>
					<input
						type="text"
						name="bio"
						value={user.bio}
						onChange={onChange}
						className="form-control"
						placeholder="Bio"
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="website" className="form-label">
						Website
					</label>
					<input
						type="text"
						name="website"
						value={user.website}
						onChange={onChange}
						className="form-control"
						placeholder="Website"
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="location" className="form-label">
						Location
					</label>
					<input
						type="text"
						name="location"
						value={user.location}
						onChange={onChange}
						className="form-control"
						placeholder="Location"
					/>
				</div>
				<button
					className="btn btn-lg btn-primary rounded-pill"
					type="submit"
				>
					Update
				</button>
			</form>
		</div>
	);
};

export default EditProfile;
