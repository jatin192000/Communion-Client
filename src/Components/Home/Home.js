import React, { useEffect } from "react";
import { useStateIfMounted } from "use-state-if-mounted";
import { Link } from "react-router-dom";
import PostItem from "../Posts/PostItem";
import PostService from "../../Services/PostService";
import PostLoader from "../Loaders/PostLoader";

const Home = () => {
	const [posts, setPosts] = useStateIfMounted([]);
	useEffect(() => {
		PostService.getTimelinePosts().then((data) => {
			setPosts(data.posts);
		});
	}, []);

	if (posts) {
		posts.sort((p1, p2) => {
			return new Date(p2.createdAt) - new Date(p1.createdAt);
		});
	}
	return (
		<div className="grid grid-cols-1 gap-6 flex">
			<Link to="/createPost">
				<button className="mx-auto mt-5 font-semibold bg-yellow-500 text-dark w-1/3 py-4 rounded-lg flex items-center justify-center focus:shadow-outline focus:outline-none">
					<span className="mx-auto uppercase">Create Post</span>
				</button>
			</Link>
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

export default Home;
