import React, { useState, useEffect } from "react";
import PostItem from "./PostItem";
import PostService from "../../Services/PostService";
import PostLoader from "../Loaders/PostLoader";

const Posts = (props) => {
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		const res = PostService.getAllPosts();
		setPosts(
			res.data.sort((p1, p2) => {
				return new Date(p2.createdAt) - new Date(p1.createdAt);
			})
		);
	}, []);

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8">
			{posts ? (
				posts.map((post) => {
					return (
						<PostItem
							key={post._id}
							title={post.title}
							body={post.body}
							id={post._id}
							upvotes={post.upvotes}
							downvotes={post.downvotes}
							author={post.author}
							createdAt={post.createdAt}
						/>
					);
				})
			) : (
				<PostLoader />
			)}
		</div>
	);
};

export default Posts;
