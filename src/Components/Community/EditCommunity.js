import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import CommunityService from "../../Services/CommunityService";
import { useParams } from "react-router";
import axios from "axios";

const PF = "/Images/";

const EditCommunity = (props) => {
	const username = useParams().username;
	const [communityID, setCommunityID] = useState(null);
	const [community, setCommunity] = useState({
		name: "",
		about: "",
		tags: [],
	});
	let timerID = useRef(null);
	const [profilePic, setProfilePic] = useState("");
	const [coverPic, setCoverPic] = useState("");
	useEffect(() => {
		return () => {
			clearTimeout(timerID);
		};
	}, []);

	const [tagInput, setTagInput] = useState("");

	useEffect(() => {
		CommunityService.get(username).then((data) => {
			if (data.success) {
				setCommunity({
					name: data.community.name,
					about: data.community.about,
					tags: data.community.tags,
				});
				setCommunityID(data.community._id);
				setProfilePic(data.community.profilePicture);
				setCoverPic(data.community.coverPicture);
			} else {
				props.history.push("/error");
			}
		});
	}, [username, props.history]);

	const onChange = (e) => {
		setCommunity({ ...community, [e.target.name]: e.target.value });
	};

	const inputKeyDown = (e) => {
		const val = e.target.value.trim();
		if (e.key === " " && val) {
			// Check if tag already exists
			if (
				community.tags.find(
					(tag) => tag.toLowerCase() === val.toLowerCase()
				)
			) {
				setTagInput("");
				return;
			}
			setCommunity({ ...community, tags: [...community.tags, val] });
			setTagInput("");
		} else if (e.key === "Backspace" && !val) {
			removeTag(community.tags.length - 1);
		}
	};

	const removeTag = (i) => {
		const newTags = [...community.tags];
		newTags.splice(i, 1);
		setCommunity({ ...community, tags: newTags });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		CommunityService.update(community, communityID).then((data) => {
			if (!data.success) {
				toast.error(data.message);
			} else {
				toast.success(data.message);
			}
		});
	};

	const deleteCommunity = () => {
		if (communityID) {
			CommunityService.delete(communityID).then((data) => {
				if (data.success) {
					toast.success("Community Deleted Successfully");
					timerID = setTimeout(() => {
						props.history.push("/communities");
					}, 2000);
				} else {
					toast.error("Community Not Deleted");
				}
			});
		}
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
			const res = await axios.post(
				`/community/uploadProfile/${communityID}`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			if (res.data.success) {
				toast.success(res.data.message);
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
			const res = await axios.post(
				`/community/uploadCover/${communityID}`,
				formData1,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			if (res.data.success) {
				toast.success(res.data.message);
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
								accept=".png, .jpg, .jpeg, .svg"
								onChange={handleCoverPic}
								ref={hiddenCoverInput}
							/>
							<img
								src={PF + coverPic}
								className="coverBtn col-span-2"
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
								accept=".png, .jpg, .jpeg, .svg"
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
						className="w-full flex mt-4 text-black"
						onSubmit={onSubmit}
					>
						<div className="mx-auto max-w-xs relative ">
							<input
								className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
								type="text"
								name="name"
								placeholder="Community Name"
								onChange={onChange}
								value={community.name}
							/>
							<textarea
								className="h-50 resize-y w-full px-8 py-4 rounded-lg font-medium bg-white-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
								name="about"
								type="textbox"
								onChange={onChange}
								value={community.about}
								placeholder="About"
							/>
							{community.tags.map((tag, i) => (
								<li
									className="px-4 py-4 rounded-lg font-medium bg-gray-100 border inline-flex mr-2 text-sm focus:outline-none mt-5"
									key={tag}
								>
									{tag}
								</li>
							))}
							<input
								className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
								type="text"
								name="tag"
								onChange={(e) => {
									e.preventDefault();
									setTagInput(e.target.value);
								}}
								onKeyDown={inputKeyDown}
								value={tagInput}
								placeholder="Add Tags"
							/>
							<button
								type="submit"
								className="mt-5 tracking-wide font-semibold bg-yellow-500 text-black w-full py-4 rounded-lg flex items-center justify-center focus:shadow-outline focus:outline-none"
							>
								<span className="uppercase">Update</span>
							</button>
						</div>
					</form>
					<button
						onClick={deleteCommunity}
						className="mt-5 mx-auto tracking-wide font-semibold bg-red-500 text-white w-1/4 py-4 rounded-lg flex items-center justify-center focus:shadow-outline focus:outline-none"
					>
						<span className="uppercase">Delete Community</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditCommunity;
