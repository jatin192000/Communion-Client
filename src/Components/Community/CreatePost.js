import React, { useState, useContext } from "react";
import CommunityService from "../../Services/CommunityService";
import { AuthContext } from "../../Context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router";

const CreatePosts = (props) => {
	const [post, setPost] = useState({
		title: "",
		body: "",
		username: useParams().username,
	});
	const authContext = useContext(AuthContext);

	const onSubmit = (e) => {
		e.preventDefault();
		CommunityService.createPost(post).then((data) => {
			resetForm();
			if (data.message === "Unauthorized") {
				authContext.setUser({ username: "", role: "" });
				authContext.setIsAuthenticated(false);
			}
			if (!data.success) {
				toast.error(data.message);
			} else {
				toast.success(data.message);
			}
		});
	};

	const onChange = (e) => {
		setPost({ ...post, [e.target.name]: e.target.value });
	};

	const resetForm = () => {
		setPost({ ...post, title: "", body: "" });
	};
	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<ToastContainer />
			<form onSubmit={onSubmit} className="space-y-4 text-gray-700">
				<div className="flex flex-wrap">
					<div className="w-full">
						<input
							type="text"
							name="title"
							required
							value={post.title}
							onChange={onChange}
							className="h-50 resize-y w-full px-8 py-4 rounded-lg font-medium bg-white-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
							placeholder="Title"
						/>
					</div>
				</div>
				<div className="flex flex-wrap">
					<div className="w-full">
						<textarea
							className="h-44 resize-y w-full px-8 py-4 rounded-lg font-medium bg-white-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
							name="body"
							type="textbox"
							required
							value={post.body}
							onChange={onChange}
							placeholder="Body"
						/>
					</div>
				</div>
				<button className="btn-post mx-auto" type="submit">
					Post
				</button>
			</form>
		</div>
	);
};

export default CreatePosts;