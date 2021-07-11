import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import CommunityService from "../../Services/CommunityService";
import { FiExternalLink } from "react-icons/fi";

const CommunitiesList = (props) => {
	const [showModal1, setShowModal1] = useState(false);
	var date = new Date(props.createdOn);
	const createDate = date.toLocaleString();
	const deleteCommunity = () => {
		if (props.id) {
			CommunityService.delete(props.id).then((data) => {
				if (data.success) {
					toast.success("Community Deleted Successfully");
				} else {
					toast.error("Community Not Deleted");
				}
			});
		}
	};

	return (
		<div className="follow-bar my-auto">
			<ToastContainer />
			<div className="post-top grid grid-cols-6 flex justify-center">
				<Link to={`/community/${props.username}`}>
					<img
						src={`/Images/${props.profilePicture}`}
						className="post-image"
						alt="profile-pic"
					/>
					<div className="post-username m-0 p-0 mt-2 my-0">
						<h3>{props.username}</h3>
					</div>
				</Link>
				<div className="post-username my-auto">
					<h3>Followers: {props.followers}</h3>
				</div>
				<div className="post-username my-auto col-span-2">
					<h3>Created: {createDate}</h3>
				</div>
				<div className="m-auto">
					<img
						className="delete-icon"
						src="/Images/delete.svg"
						onClick={() => setShowModal1(!showModal1)}
						alt="delete icon"
					/>
				</div>
				<Link to={`/community/${props.username}`} className="m-auto">
					<FiExternalLink />
				</Link>
			</div>
			<div className={showModal1 ? "modal active" : "modal"}>
				<h2 className="font-medium text-lg text-center">
					Delete User ?
				</h2>
				<p className="text-center px-5 py-2">
					Are you sure you want to delete this post because after this
					action you won't be able to recover it.
				</p>
				<div className="grid grid-cols-2">
					<button
						onClick={() => setShowModal1(!showModal1)}
						className="px-6 py-2 cursor-pointer text-center text-xs rounded-full bg-gray-100 text-base font-medium tracking-wide placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white hover:bg-gray-200 m-2"
					>
						Close
					</button>
					<button
						onClick={deleteCommunity}
						className="px-6 py-2 cursor-pointer text-center text-xs rounded-full text-base font-medium tracking-wide bg-red-600 text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white hover:bg-red-700 m-2"
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default CommunitiesList;
