import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminService from "../../Services/AdminService";
import "../Posts/post.css";
import { ToastContainer, toast } from "react-toastify";

const PF = "/Images/";

const UsersList = (props) => {
	const [showModal1, setShowModal1] = useState(false);
	const [showModal2, setShowModal2] = useState(false);

	var date = new Date(props.createdAt);
	const createDate = date.toLocaleString();

	const deleteUser = () => {
		AdminService.deleteUser(props.id).then((data) => {
			if (data.success) {
				toast.success("User successfully deleted");
				window.location.reload();
			} else {
				toast.success("Some error occurred during deleting user");
			}
		});
	};

	const changeRole = async () => {
		await AdminService.changeUserRole(props.id).then((data) => {
			if (data.success) {
				toast.success("Role Changed");
				window.location.reload();
			} else {
				toast.success(
					"Some error occurred during changing user's role"
				);
			}
		});
	};

	return (
		<div className="follow-bar my-auto">
			<ToastContainer />
			<div className="post-top grid grid-cols-12">
				<Link to={`/user/${props.username}`} className="col-span-3">
					<img
						src={`/Images/${props.profile}`}
						className="post-image"
						alt="profile-pic"
					/>
					<div className="post-username mt-2">
						<h3>{props.username}</h3>
					</div>
				</Link>
				<div className="post-username col-span-4 my-auto">
					<h3>{props.email}</h3>
				</div>
				<div className="post-username col-span-3  my-auto">
					<h3>{createDate}</h3>
				</div>
				<button
					className="px-2 py-2 cursor-pointer text-center rounded-full bg-gray-100 border border-gray-200 font-medium placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white hover:bg-gray-200 capitalize "
					onClick={() => setShowModal2(!showModal2)}
				>
					{props.role}
				</button>
				<img
					className="delete-icon m-auto"
					src={`${PF}delete.svg`}
					onClick={() => setShowModal1(!showModal1)}
					alt="delete icon"
				/>
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
						onClick={deleteUser}
						className="px-6 py-2 cursor-pointer text-center text-xs rounded-full text-base font-medium tracking-wide bg-red-600 text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white hover:bg-red-700 m-2"
					>
						Delete
					</button>
				</div>
			</div>
			<div
				className={
					showModal2 ? "modal active w-20 h-56" : "modal w-20 h-56"
				}
			>
				<h2 className="font-medium text-lg text-center pt-4">
					Change User Role
				</h2>
				<p className="text-center px-5 py-2 m-4">
					Are you sure you want change this users role
				</p>
				<div className="grid grid-cols-2">
					<button
						onClick={() => setShowModal2(!showModal2)}
						className="px-6 py-2 cursor-pointer text-center text-xs rounded-full bg-gray-100 text-base font-medium tracking-wide placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white hover:bg-gray-200 m-2"
					>
						Close
					</button>
					<button
						onClick={changeRole}
						className="px-6 py-2 cursor-pointer text-center text-xs rounded-full text-base font-medium tracking-wide bg-indigo-500 text-white placeholder-gray-500 focus:outline-none focus:border-pink-400 focus:bg-white hover:bg-indigo-600 m-2"
					>
						{props.role === "admin" ? "User" : "Admin"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default UsersList;
