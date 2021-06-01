import React, { useState, useEffect } from "react";
import PostItem from "./PostItem";
import PostService from "../../Services/PostService";

const Posts = (props) => {
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		PostService.getAllPosts().then((data) => {
			setPosts(data.posts);
		});
		//setIsLoading(false);
	}, []);

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8">
			{isLoading ? (
				<>
					<div class="border border-light-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
						<div class="animate-pulse flex space-x-4">
							<div class="rounded-full bg-light-blue-400 h-12 w-12"></div>
							<div class="flex-1 space-y-4 py-1">
								<div class="h-4 bg-light-blue-400 rounded w-3/4"></div>
								<div class="space-y-2">
									<div class="h-4 bg-light-blue-400 rounded"></div>
									<div class="h-4 bg-light-blue-400 rounded w-5/6"></div>
								</div>
							</div>
						</div>
					</div>
				</>
			) : (
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
						/>
					);
				})
			)}
		</div>
	);
};

export default Posts;
