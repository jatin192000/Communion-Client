import React, { useState, useContext, useEffect } from "react";
import PostService from "../../Services/PostService";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import "./post.css";
import { format } from "timeago.js";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const PF = "/Images/";

const Comment = (props) => {
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

	const commentDelete = async () => {
		var data = {
			id: props.id,
			c_id: props.c_id,
		};
		const res = await PostService.deleteComment(data);
		if (res.success) {
			toast.success("Comment Deleted Successfully");
			window.location.reload();
		} else {
			toast.error("Could not delete Comment");
		}
	};
	const commentUpvote = (e) => {
		if (authContext.user.username === "") {
			history.push("/login");
		}
		PostService.upvoteComment(props.c_id);
		setUpvote(isUpvoted ? upvote - 1 : upvote + 1);
		setDownvote(isDownvoted ? downvote - 1 : downvote);
		setIsUpvoted(!isUpvoted);
		setIsDownvoted(false);
	};
	const commentDownvote = (e) => {
		if (authContext.user.username === "") {
			history.push("/login");
		}
		PostService.downvoteComment(props.c_id);
		setDownvote(isDownvoted ? downvote - 1 : downvote + 1);
		setUpvote(isUpvoted ? upvote - 1 : upvote);
		setIsDownvoted(!isDownvoted);
		setIsUpvoted(false);
	};

	return (
		<div className="m-0 grid grid-cols-1">
			<div className="post-bottom pb-5"></div>
			<ToastContainer />
			<div className="px-5">
				<div className="post-top">
					<Link to={`/user/${props.author}`}>
						<img
							src={`/Images/${props.profilePicture}`}
							className="comment-image"
							alt="profile-pic"
						/>
						<div className="comment-username">
							<h4>{props.author}</h4>
							<span>{format(props.createdAt)}</span>
						</div>
					</Link>
				</div>
				<div className="comment-content">
					<p>{props.body}</p>
				</div>
				<ul className="comment-votes">
					<li>
						{isUpvoted ? (
							<img
								className="comment-icon"
								src={`${PF}upvote_fill.svg`}
								onClick={commentUpvote}
								alt=""
							/>
						) : (
							<img
								className="comment-icon"
								src={`${PF}upvote_empty.svg`}
								onClick={commentUpvote}
								alt=""
							/>
						)}
					</li>
					<li>
						<p>{upvote - downvote}</p>
					</li>
					<li>
						{isDownvoted ? (
							<img
								className="comment-icon"
								src={`${PF}downvote_fill.svg`}
								onClick={commentDownvote}
								alt=""
							/>
						) : (
							<img
								className="comment-icon"
								src={`${PF}downvote_empty.svg`}
								onClick={commentDownvote}
								alt=""
							/>
						)}
					</li>
					{authContext.user.role === "admin" ||
					authContext.user.username === props.author ? (
						<li>
							<img
								className="comment-delete-icon ml-5"
								src={`${PF}delete.svg`}
								onClick={commentDelete}
								alt="delete"
							/>
						</li>
					) : null}
					<li>
						<img
							className="comment-icon ml-5"
							src={`${PF}report.svg`}
							//onClick={commentDelete}
							alt="report"
						/>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Comment;
