import React, { useState, useContext, useEffect } from "react";
import PostService from "../../Services/PostService";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import "./post.css";
import { useHistory } from "react-router-dom";

const PF = "/Images/";

const PostItem = (props) => {
	let history = useHistory();
	const [upvote, setUpvote] = useState(props.upvotes.length);
	const [downvote, setDownvote] = useState(props.downvotes.length);
	const authContext = useContext(AuthContext);
	const [isUpvoted, setIsUpvoted] = useState(
		props.upvotes.includes(authContext.user._id)
	);
	const [isDownvoted, setIsDownvoted] = useState(
		props.downvotes.includes(authContext.user._id)
	);
	useEffect(() => {
		setIsUpvoted(props.upvotes.includes(authContext.user._id));
	}, [authContext.user._id, props.upvotes]);

	useEffect(() => {
		setIsDownvoted(props.downvotes.includes(authContext.user._id));
	}, [authContext.user._id, props.downvotes]);
	/*const postDelete = () => {
		PostService.deletePost(props.id);
		window.location.reload(false);
	};*/
	const postUpvote = () => {
		if (authContext.user.username === "") {
			history.push("/login");
		}
		PostService.upvotePost(props.id);
		setUpvote(isUpvoted ? upvote - 1 : upvote + 1);
		setDownvote(isDownvoted ? downvote - 1 : downvote);
		setIsUpvoted(!isUpvoted);
		setIsDownvoted(false);
	};
	const postDownvote = () => {
		if (authContext.user.username === "") {
			history.push("/login");
		}
		PostService.downvotePost(props.id);
		setDownvote(isDownvoted ? downvote - 1 : downvote + 1);
		setUpvote(isUpvoted ? upvote - 1 : upvote);
		setIsDownvoted(!isDownvoted);
		setIsUpvoted(false);
	};
	return (
		<section className="border-solid border-2 border-black w-full max-w-lg overflow-hidden rounded-lg sm:flex">
			<div className="w-full max-w-lg overflow-hidden rounded-lg sm:flex">
				<div className="w-full flex md:flex-col bg-white">
					<div className="postTop">
						<div className="postTopLeft">
							<Link to={`/user/${props.author}`}>
								<span className="postUsername static">
									{props.author}
								</span>
								<img
									src="/Images/avatar1.png"
									className="post-author inline-block"
									alt="profile-pic"
								/>
							</Link>
							<span className="postDate">{props.createdAt}</span>
						</div>
					</div>
					<h4 className="mb-3 text-xl font-semibold tracking-tight text-gray-800">
						{props.title}
					</h4>
					<p className="leading-normal text-gray-700">{props.body}</p>
					<div className="postBottom">
						<div className="postBottomLeft">
							{isUpvoted ? (
								<img
									className="likeIcon"
									src={`${PF}upvote_fill.svg`}
									onClick={postUpvote}
									alt=""
								/>
							) : (
								<img
									className="likeIcon"
									src={`${PF}upvote_empty.svg`}
									onClick={postUpvote}
									alt=""
								/>
							)}
							<span className="postLikeCounter">
								{upvote - downvote}
							</span>
							{isDownvoted ? (
								<img
									className="likeIcon"
									src={`${PF}downvote_fill.svg`}
									onClick={postDownvote}
									alt=""
								/>
							) : (
								<img
									className="likeIcon"
									src={`${PF}downvote_empty.svg`}
									onClick={postDownvote}
									alt=""
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default PostItem;
