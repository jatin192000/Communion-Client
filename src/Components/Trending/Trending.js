import React, { useState, useEffect, useContext } from "react";
import PostItem from "../Posts/PostItem";
import PostService from "../../Services/PostService";

const Trending = () => {
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		PostService.getAllPosts().then((data) => {
			setPosts(data.posts);
		});
	}, []);

	posts.sort((p1, p2) => {
		return (
			p2.upvotes.length -
			p2.downvotes.length -
			p1.upvotes.length +
			p1.downvotes.length
		);
	});
	return (
		<div className="grid grid-cols-1 gap-6 xl:gap-8">
			{posts.map((post) => {
				return (
					<PostItem
						key={post._id}
						title={post.title}
						body={post.body}
						id={post._id}
						upvotes={post.upvotes}
						downvotes={post.downvotes}
						author={post.author.username}
						profilePicture={post.author.profilePicture}
						createdAt={post.createdAt}
					/>
				);
			})}
		</div>
	);
};

export default Trending;
