import React, { useState, useContext, useEffect } from "react";
import PostService from "../../Services/PostService";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import "./post.css";
import { format } from "timeago.js";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ReportService from "../../Services/ReportService";

const PF = "/Images/";

const Comment = (props) => {
	let history = useHistory();
	const [upvote, setUpvote] = useState(props.upvotes.length);
	const [downvote, setDownvote] = useState(props.downvotes.length);
	const authContext = useContext(AuthContext);
	const [showModal1, setShowModal1] = useState(false);
	const [showModal2, setShowModal2] = useState(false);
	const [reportReason, setReportReason] = useState();
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
	const commentReport = async () => {
		const res = await ReportService.report(
			props.c_id,
			"comment",
			reportReason
		);
		if (res.success) {
			toast.success("Comment Reported Successfully");
			window.location.reload();
		} else {
			toast.error("Could not report post");
		}
	};
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
								onClick={() => setShowModal1(!showModal1)}
								alt="delete"
							/>
						</li>
					) : null}
					<li>
						<img
							className="comment-icon ml-5"
							src={`${PF}report.svg`}
							onClick={() => setShowModal2(!showModal2)}
							alt="report"
						/>
					</li>
				</ul>
			</div>
			<div className={showModal1 ? "modal active" : "modal"}>
				<h2 className="font-medium text-lg text-center">
					Delete Comment ?
				</h2>
				<p className="text-center px-5 py-2">
					Are you sure you want to delete this comment because after
					this action you won't be able to recover it.
				</p>
				<div className="grid grid-cols-2">
					<button
						onClick={() => setShowModal1(!showModal1)}
						className="px-6 py-2 cursor-pointer text-center text-xs rounded-full bg-gray-100 text-base font-normal tracking-wide placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white hover:bg-gray-200 m-2"
					>
						Close
					</button>
					<button
						onClick={commentDelete}
						className="px-6 py-2 cursor-pointer text-center text-xs rounded-full text-base font-normal tracking-wide bg-red-600 text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white hover:bg-red-700 m-2"
					>
						Delete
					</button>
				</div>
			</div>
			<div className={showModal2 ? "modal active" : "modal"}>
				<h2 className="font-medium text-center">Report Comment</h2>
				<p className="text-center">
					This is going to report the comment
				</p>
				<div className="grid grid-cols-1">
					<input
						className="w-full px-2 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white m-2"
						type="text"
						name="reportReason"
						placeholder="Give reason for reporting this post"
						onChange={(e) => setReportReason(e.target.value)}
						required
					/>
					<div className="grid grid-cols-2">
						<button
							onClick={() => setShowModal2(!showModal2)}
							className="px-6 py-2 cursor-pointer text-center text-xs rounded-full bg-gray-100 text-base font-normal tracking-wide placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white hover:bg-gray-200 m-2"
						>
							Close
						</button>
						<button
							onClick={commentReport}
							className="px-6 py-2 cursor-pointer text-center text-xs rounded-full text-base font-normal tracking-wide bg-red-600 text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white hover:bg-red-700 m-2"
						>
							Report
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Comment;
