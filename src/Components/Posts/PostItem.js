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

const PostItem = (props) => {
	let history = useHistory();
	const [upvote, setUpvote] = useState(props.upvotes.length);
	const [showModal1, setShowModal1] = useState(false);
	const [showModal2, setShowModal2] = useState(false);
	const [downvote, setDownvote] = useState(props.downvotes.length);
	const authContext = useContext(AuthContext);
	const [isUpvoted, setIsUpvoted] = useState(
		props.upvotes.includes(authContext.user._id)
	);
	const [reportReason, setReportReason] = useState();

	const [isDownvoted, setIsDownvoted] = useState(
		props.downvotes.includes(authContext.user._id)
	);

	useEffect(() => {
		setIsUpvoted(props.upvotes.includes(authContext.user._id));
	}, [authContext.user._id, props.upvotes]);

	useEffect(() => {
		setIsDownvoted(props.downvotes.includes(authContext.user._id));
	}, [authContext.user._id, props.downvotes]);

	const postDelete = async () => {
		const res = await PostService.deletePost(props.id);
		if (res.success) {
			toast.success("Post Deleted Successfully");
			window.location.reload();
		} else {
			toast.error("Could not delete post");
		}
	};
	const postReport = async () => {
		const res = await ReportService.report(props.id, "post", reportReason);
		if (res.success) {
			toast.success("Post Reported Successfully");
			window.location.reload();
		} else {
			toast.error("Could not report post");
		}
	};
	const postUpvote = (e) => {
		if (authContext.user.username === "") {
			history.push("/login");
		}
		PostService.upvotePost(props.id);
		setUpvote(isUpvoted ? upvote - 1 : upvote + 1);
		setDownvote(isDownvoted ? downvote - 1 : downvote);
		setIsUpvoted(!isUpvoted);
		setIsDownvoted(false);
	};
	const postDownvote = (e) => {
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
		<div>
			<div className="post-bar">
				<ToastContainer />
				<Link to={`/post/${props.id}`}>
					<div className="post-top">
						{props.community ? (
							<div>
								<Link to={`/community/${props.community}`}>
									<img
										src={`/Images/${props.communityprofilePicture}`}
										className="post-image"
										alt="profile-pic"
									/>
									<div className="post-username">
										<h3>{props.community}</h3>
										<span>{format(props.createdAt)}</span>
									</div>
								</Link>

								<div className="post-username inline-flex">
									<span className="my-auto">Posted By:</span>
									<Link to={`/username/${props.author}`}>
										<p className="ml-1 text-sm font-normal">
											{props.author}
										</p>
									</Link>
								</div>
							</div>
						) : (
							<Link to={`/user/${props.author}`}>
								<img
									src={`/Images/${props.profilePicture}`}
									className="post-image"
									alt="profile-pic"
								/>
								<div className="post-username">
									<h3>{props.author}</h3>
									<span>{format(props.createdAt)}</span>
								</div>
							</Link>
						)}
					</div>
					<div className="post-content">
						<h3>{props.title}</h3>
						<p>{props.body}</p>
					</div>
				</Link>
				<div className="post-bottom">
					<ul className="votes">
						<li>
							{isUpvoted ? (
								<img
									className="post-icon"
									src={`${PF}upvote_fill.svg`}
									onClick={postUpvote}
									alt="upvote icon"
								/>
							) : (
								<img
									className="post-icon"
									src={`${PF}upvote_empty.svg`}
									onClick={postUpvote}
									alt="upvote icon"
								/>
							)}
						</li>
						<li>
							<p>{upvote - downvote}</p>
						</li>
						<li>
							{isDownvoted ? (
								<img
									className="post-icon"
									src={`${PF}downvote_fill.svg`}
									onClick={postDownvote}
									alt="downvote icon"
								/>
							) : (
								<img
									className="post-icon"
									src={`${PF}downvote_empty.svg`}
									onClick={postDownvote}
									alt="downvote icon"
								/>
							)}
						</li>
						<Link to={`/post/${props.id}`}>
							<li>
								<img
									className="post-icon mt-1 comment ml-5"
									src={`${PF}comment.svg`}
									onClick={null}
									alt="comment icon"
								/>
								<span className="text-sm ml-1 font-medium text-gray-600 my-auto">
									{props.commentsCount} Comments
								</span>
							</li>
						</Link>
						{authContext.user.role === "admin" ||
						props.community ||
						authContext.user.username === props.author ? (
							<li>
								<img
									className="delete-icon ml-5"
									src={`${PF}delete.svg`}
									onClick={() => setShowModal1(!showModal1)}
									alt="delete icon"
								/>
							</li>
						) : null}
						<li>
							<img
								className="post-icon ml-5 toggle-button"
								src={`${PF}report.svg`}
								alt="report icon"
								onClick={() => setShowModal2(!showModal2)}
							/>
						</li>
					</ul>
				</div>
			</div>
			<div className={showModal1 ? "modal active" : "modal"}>
				<h2 className="font-medium text-lg text-center">
					Delete Post ?
				</h2>
				<p className="text-center px-5 py-2">
					Are you sure you want to delete this post because after this
					action you won't be able to recover it.
				</p>
				<div className="grid grid-cols-2">
					<button
						onClick={() => setShowModal1(!showModal1)}
						className="px-6 py-2 cursor-pointer text-center text-xs rounded-full bg-gray-100 text-base font-normal tracking-wide placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white hover:bg-gray-200 m-2"
					>
						Close
					</button>
					<button
						onClick={postDelete}
						className="px-6 py-2 cursor-pointer text-center text-xs rounded-full text-base font-normal tracking-wide bg-red-600 text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white hover:bg-red-700 m-2"
					>
						Delete
					</button>
				</div>
			</div>
			<div className={showModal2 ? "modal active" : "modal"}>
				<h2 className="font-medium text-center">Report Post</h2>
				<p className="text-center">This is going to report the post</p>
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
							onClick={postReport}
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

export default PostItem;
