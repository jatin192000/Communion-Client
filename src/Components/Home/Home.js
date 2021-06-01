import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostItem from "../Posts/PostItem";
import PostService from "../../Services/PostService";
const Home = () => {
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		PostService.getTimelinePosts().then((data) => {
			setPosts(data.posts);
		});
	}, []);

	return (
		<div className="grid grid-cols-1 gap-6">
			<Link to="/createPost">
				<button className="mx-auto mt-5 font-semibold bg-yellow-500 text-dark w-1/3 py-4 rounded-lg flex items-center justify-center focus:shadow-outline focus:outline-none">
					<span className="mx-auto uppercase">Create Post</span>
				</button>
			</Link>
			{posts.map((post) => {
				return (
					<PostItem
						key={post._id}
						title={post.title}
						body={post.body}
						id={post._id}
						upvotes={post.upvotes}
						downvotes={post.downvotes}
						author={post.author}
					/>
				);
			})}
		</div>
	);
};

export default Home;
