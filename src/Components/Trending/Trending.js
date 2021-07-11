import React, { useState, useEffect } from "react";
import PostItem from "../Posts/PostItem";
import PostService from "../../Services/PostService";
import PostLoader from "../Loaders/PostLoader";

const Trending = () => {
	const [posts, setPosts] = useState(null);
	useEffect(() => {
		PostService.getAllPosts().then((data) => {
			setPosts(data.posts);
		});
	}, []);

	if (posts) {
		posts.sort((p1, p2) => {
			return (
				p2.upvotes.length -
				p2.downvotes.length -
				p1.upvotes.length +
				p1.downvotes.length
			);
		});
	}
	return (
		<div className="grid grid-cols-1 gap-6 xl:gap-8">
			{posts ? (
				posts.length > 0 ? (
					posts.map((post) => {
						return (
							<PostItem
								key={post._id}
								title={post.title}
								body={post.body}
								id={post._id}
								upvotes={post.upvotes}
								downvotes={post.downvotes}
								author={post.author.username}
								community={
									post.community
										? post.community.username
										: null
								}
								communityprofilePicture={
									post.community
										? post.community.profilePicture
										: null
								}
								commentsCount={post.comments.length}
								createdAt={post.createdAt}
								profilePicture={post.author.profilePicture}
							/>
						);
					})
				) : (
					<p className="m-auto mt-10 text-xl uppercase">
						No Posts Yet
					</p>
				)
			) : (
				<PostLoader />
			)}
		</div>
	);
};

export default Trending;
