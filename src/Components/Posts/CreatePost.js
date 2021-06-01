import React, { useState, useContext } from "react";
import PostService from "../../Services/PostService";
import { AuthContext } from "../../Context/AuthContext";
import { ToastContainer, toast } from "react-toastify";

const CreatePosts = (props) => {
	const [post, setPost] = useState({ title: "", body: "" });
	const authContext = useContext(AuthContext);

	const onSubmit = (e) => {
		e.preventDefault();
		PostService.postPost(post).then((data) => {
			resetForm();
			if (data.message === "Unauthorized") {
				authContext.setUser({ username: "", role: "" });
				authContext.setIsAuthenticated(false);
			}
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

	const onChange = (e) => {
		setPost({ ...post, [e.target.name]: e.target.value });
	};

	const resetForm = () => {
		setPost({ title: "", body: "" });
	};
	return (
		<div>
			<ToastContainer />
			<form onSubmit={onSubmit} className="space-y-4 text-gray-700">
				<div className="flex flex-wrap">
					<div className="w-full">
						<label class="block mb-1" for="title">
							Title
						</label>
						<input
							type="text"
							name="title"
							required
							value={post.title}
							onChange={onChange}
							className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
							placeholder="Title"
						/>
					</div>
				</div>
				<div className="flex flex-wrap">
					<div className="w-full">
						<label class="block mb-1" for="body">
							Body
						</label>
						<textarea
							className="h-50 resize-y w-full px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
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
