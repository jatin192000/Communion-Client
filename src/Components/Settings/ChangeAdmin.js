import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import CommunityService from "../../Services/CommunityService";
import { useParams } from "react-router";

const ChangeAdmin = (props) => {
	const username = useParams().username;
	const [communityID, setCommunityID] = useState(null);
	const [admins, setAdmins] = useState({ tags: ["jatin_singh"] });
	let timerID = useRef(null);

	useEffect(() => {
		return () => {
			clearTimeout(timerID);
		};
	}, []);

	const [tagInput, setTagInput] = useState("");

	// useEffect(() => {
	// 	CommunityService.get(username).then((data) => {
	// 		if (data.success) {
	// 			setAdmins({
	// 				tags: data.admins.admin,
	// 			});
	// 			setCommunityID(data.admins._id);
	// 		} else {
	// 			props.history.push("/error");
	// 		}
	// 	});
	// }, [username, props.history]);

	const inputKeyDown = (e) => {
		const val = e.target.value.trim();
		if (e.key === " " && val) {
			// Check if tag already exists
			if (
				admins.tags.find(
					(tag) => tag.toLowerCase() === val.toLowerCase()
				)
			) {
				setTagInput("");
				return;
			}
			setAdmins({ ...admins, tags: [...admins.tags, val] });
			setTagInput("");
		} else if (e.key === "Backspace" && !val) {
			removeTag(admins.tags.length - 1);
		}
	};

	const removeTag = (i) => {
		const newTags = [...admins.tags];
		newTags.splice(i, 1);
		setAdmins({ ...admins, tags: newTags });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		CommunityService.update(admins, communityID).then((data) => {
			if (!data.success) {
				toast.error(data.message);
			} else {
				toast.success(data.message);
			}
		});
	};

	return (
		<form className="w-full flex mt-4 text-black" onSubmit={onSubmit}>
			<ToastContainer />
			<div className="mx-auto max-w-xs relative ">
				{admins.tags.map((val, i) => (
					<li
						className="px-4 py-4 rounded-lg font-medium bg-gray-100 border inline-flex mr-2 text-sm focus:outline-none mt-5"
						key={val}
					>
						{val}
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
	);
};

export default ChangeAdmin;
