import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import PostService from "../../Services/PostService";
import PostLoader from "../Loaders/PostLoader";
import { format } from "timeago.js";
import { AuthContext } from "../../Context/AuthContext";
import { useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import Comment from "./Comment";

const PF = "/Images/";

const Posts = (props) => {
	const [posts, setPosts] = useState(null);
	const [upvote, setUpvote] = useState(0);
	const [downvote, setDownvote] = useState(0);
	const postId = useParams().id;
	const [comment, setComment] = useState(null);
	const [comments, setComments] = useState(null);
	const authContext = useContext(AuthContext);
	const [isUpvoted, setIsUpvoted] = useState(false);
	const [isDownvoted, setIsDownvoted] = useState(false);

	useEffect(() => {
		PostService.getPost(postId).then((data) => {
			if (data.success) {
				setPosts(data.post);
				setIsUpvoted(data.post.upvotes.includes(authContext.user._id));
				setIsDownvoted(
					data.post.downvotes.includes(authContext.user._id)
				);
				setUpvote(data.post.upvotes.length);
				setDownvote(data.post.downvotes.length);
				PostService.getPostComments(postId).then((document) => {
					if (document.success) {
						setComments(document.comments);
					}
				});
			} else {
				props.history.push("/error");
			}
		});
	}, [authContext.user._id, postId, props.history]);

	const postDelete = async () => {
		const res = await PostService.deletePost(props.id);
		if (res.success) {
			toast.success("Post Deleted Successfully");
			window.location.reload();
		} else {
			toast.error("Could not delete post");
		}
	};
	const postUpvote = () => {
		if (authContext.user.username === "") {
			props.history.push("/login");
		}
		PostService.upvotePost(posts._id);
		setUpvote(isUpvoted ? upvote - 1 : upvote + 1);
		setDownvote(isDownvoted ? downvote - 1 : downvote);
		setIsUpvoted(!isUpvoted);
		setIsDownvoted(false);
	};
	const postDownvote = () => {
		if (authContext.user.username === "") {
			props.history.push("/login");
		}
		PostService.downvotePost(posts._id);
		setDownvote(isDownvoted ? downvote - 1 : downvote + 1);
		setUpvote(isUpvoted ? upvote - 1 : upvote);
		setIsDownvoted(!isDownvoted);
		setIsUpvoted(false);
	};

	const onComment = (e) => {
		e.preventDefault();
		if (!authContext.isAuthenticated) {
			props.history.push("/login");
		} else if (comment) {
			PostService.createComment({ body: comment }, postId).then(
				(data) => {
					if (data.success) {
						toast.success("Commented");
					} else {
						toast.error(data.message);
					}
				}
			);
			window.location.reload();
		} else {
			toast.error("Cannot Post and empty comment");
		}
	};

	return (
		<div className="grid grid-cols-1">
			<ToastContainer />
			{posts ? (
				<div className="post-bar">
					<div className="post-top">
						{posts.community ? (
							<>
								<Link
									to={`/community/${posts.community.username}`}
								>
									<img
										src={`/Images/${posts.community.profilePicture}`}
										className="post-image"
										alt="profile-pic"
									/>
									<div className="post-username">
										<h3>{posts.community.username}</h3>
										<span>{format(posts.createdAt)}</span>
									</div>
								</Link>

								<div className="post-username inline-flex">
									<span className="my-auto">Posted By:</span>
									<Link
										to={`/username/${posts.author.username}`}
									>
										<p className="ml-1 text-sm font-normal">
											{posts.author.username}
										</p>
									</Link>
								</div>
							</>
						) : (
							<>
								<Link to={`/user/${posts.author.username}`}>
									<img
										src={`/Images/${posts.author.profilePicture}`}
										className="post-image"
										alt="profile-pic"
									/>
									<div className="post-username">
										<h3>{posts.author.username}</h3>
										<span>{format(posts.createdAt)}</span>
									</div>
								</Link>
							</>
						)}
					</div>
					<div className="post-content">
						<h3>{posts.title}</h3>
						<p>{posts.body}</p>
					</div>
					<div className="post-bottom">
						<ul className="votes">
							<li>
								<img
									className="post-icon"
									src={
										isUpvoted
											? `${PF}upvote_fill.svg`
											: `${PF}upvote_empty.svg`
									}
									onClick={postUpvote}
									alt="upvote"
								/>
							</li>
							<li>
								<p>{upvote - downvote}</p>
							</li>
							<li>
								<img
									className="post-icon"
									src={
										isDownvoted
											? `${PF}downvote_fill.svg`
											: `${PF}downvote_empty.svg`
									}
									onClick={postDownvote}
									alt="downvote"
								/>
							</li>
							<li>
								<img
									className="post-icon comment ml-5"
									src={`${PF}comment.svg`}
									onClick={null}
									alt=""
								/>
							</li>
							{authContext.user.role === "admin" ||
							(posts.community &&
								posts.community.username ===
									authContext.user.username) ||
							authContext.user.username ===
								posts.author.username ? (
								<li>
									<img
										className="delete-icon ml-5"
										src={`${PF}delete.svg`}
										onClick={postDelete}
										alt="delete"
									/>
								</li>
							) : null}
						</ul>
					</div>
				</div>
			) : (
				<PostLoader />
			)}
			<div className="grid grid-cols-5 mb-5">
				<textarea
					className="col-span-4 h-50 resize-y p-4 rounded-lg font-medium bg-white-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
					name="comment"
					type="textbox"
					placeholder="Comment"
					onChange={(e) => setComment(e.target.value)}
					required
				/>
				<div className="mx-auto my-auto">
					<button
						type="submit"
						onClick={onComment}
						className="tracking-wide font-semibold bg-yellow-500 text-black p-4 rounded-lg flex items-center justify-center focus:outline-none focus:border-gray-400 focus:bg-white"
					>
						<span>Comment</span>
					</button>
				</div>
			</div>
			<div className="comment-bar">
				{comments ? (
					comments.length > 0 ? (
						comments.map((comment) => {
							return (
								<Comment
									key={comment._id}
									body={comment.body}
									id={postId}
									c_id={comment._id}
									upvotes={comment.upvotes}
									downvotes={comment.downvotes}
									author={comment.author.username}
									createdAt={comment.createdAt}
									profilePicture={
										comment.author.profilePicture
									}
								/>
							);
						})
					) : (
						<p className="grid justify-items-center my-10 text-xl uppercase">
							No Comments Yet
						</p>
					)
				) : (
					<PostLoader />
				)}
			</div>
		</div>
	);
};

export default Posts;
