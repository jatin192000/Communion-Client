import React, { useState, useContext, useEffect } from "react";
import PostService from "../../Services/PostService";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import "./post.css";
import { format } from "timeago.js";
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

	const postDelete = async () => {
		await PostService.deletePost(props.id);
	};
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
		<div className="post-bar px-5">
			<div className="post-top">
				{props.community ? (
					<>
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
					</>
				) : (
					<>
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
					</>
				)}
			</div>
			<div className="post-content">
				<h3>{props.title}</h3>
				<p>{props.body}</p>
			</div>
			<div className="post-bottom">
				<ul className="votes">
					<li>
						{isUpvoted ? (
							<img
								className="post-icon"
								src={`${PF}upvote_fill.svg`}
								onClick={postUpvote}
								alt=""
							/>
						) : (
							<img
								className="post-icon"
								src={`${PF}upvote_empty.svg`}
								onClick={postUpvote}
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
								className="post-icon"
								src={`${PF}downvote_fill.svg`}
								onClick={postDownvote}
								alt=""
							/>
						) : (
							<img
								className="post-icon"
								src={`${PF}downvote_empty.svg`}
								onClick={postDownvote}
								alt=""
							/>
						)}
					</li>
					<li>
						<img
							className="post-icon comment ml-5"
							src={`${PF}comment.svg`}
							onClick={null}
							alt=""
						/>
					</li>
					{authContext.user.username === props.author ? (
						<li>
							<img
								className="delete-icon ml-5"
								src={`${PF}delete.svg`}
								onClick={postDelete}
								alt=""
							/>
						</li>
					) : null}
				</ul>
			</div>
		</div>
	);
};

export default PostItem;
