import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import Validator from "../../validators/Validations";
import CommunityService from "../../Services/CommunityService";

const CreateCommunity = (props) => {
	const [community, setCommunity] = useState({
		username: "",
		name: "",
		about: "",
		tags: [],
	});
	const [tagInput, setTagInput] = useState("");
	let timerID = useRef(null);

	useEffect(() => {
		return () => {
			clearTimeout(timerID);
		};
	}, []);

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

	const resetForm = () => {
		setCommunity({ username: "", name: "", about: "", tags: [] });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const v1 = Validator.validateUsername(community.username);
		if (v1) {
			try {
				CommunityService.create(community).then((data) => {
					resetForm();
					if (data.success) {
						timerID = setTimeout(() => {
							props.history.push("/communities");
						}, 2000);
					}
					if (!data.success) {
						toast.error(data.message);
					} else {
						toast.success(data.message);
					}
				});
			} catch (error) {
				toast.error(error.message);
			}
		} else {
			toast.info(
				"Username can only have alphanumeric characters, underscore and dot are allowed but not at the start and end"
			);
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
			<ToastContainer />
			<div className="max-w-screen-xl m-0 bg-white shadow sm:rounded-lg flex justify-center flex-1">
				<div className="mt-12 flex flex-col items-center">
					<h1 className="text-2xl xl:text-3xl font-semibold">
						Create Community
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
								placeholder="Community Username"
								onChange={onChange}
								required
							/>
							<input
								className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
								type="text"
								name="name"
								placeholder="Community Name"
								onChange={onChange}
								required
							/>
							<textarea
								className="h-50 resize-y w-full px-8 py-4 rounded-lg font-medium bg-white-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
								name="about"
								type="textbox"
								onChange={onChange}
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
							/>
							<button
								type="submit"
								className="mt-5 tracking-wide font-semibold bg-yellow-500 text-black w-full py-4 rounded-lg flex items-center justify-center focus:shadow-outline focus:outline-none"
							>
								<span className="uppercase">Create</span>
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CreateCommunity;
