import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Posts/post.css";
import { ToastContainer, toast } from "react-toastify";
import AdminService from "../../Services/AdminService";

const ReportsList = (props) => {
	const [showModal1, setShowModal1] = useState(false);

	var date = new Date(props.createdAt);
	const createDate = date.toLocaleString();

	const changeStatus = async () => {
		await AdminService.changeReportStatus(props.id).then((data) => {
			if (data.success) {
				toast.success("Status Changed");
				window.location.reload();
			} else {
				toast.success(
					"Some error occurred during changing reports status"
				);
			}
		});
	};

	return (
		<div className="follow-bar my-auto">
			<ToastContainer />
			<div className="post-top grid grid-cols-4">
				<Link to={`/report/${props.for_id}`}>
					<div className="post-username mt-2">
						<h3>{props.for}</h3>
					</div>
				</Link>
				<div className="post-username my-auto">
					<h3>{props.reason}</h3>
				</div>
				<div className="post-username my-auto">
					<h3>{createDate}</h3>
				</div>
				<button
					className={
						props.status === "solved"
							? "px-2 py-2 cursor-pointer text-center rounded-full bg-green-200 border border-green-400 font-medium placeholder-green-500 focus:outline-none focus:border-green-400 focus:bg-white hover:bg-green-200 capitalize "
							: "px-2 py-2 cursor-pointer text-center rounded-full bg-red-200 border border-red-400 font-medium placeholder-red-500 focus:outline-none focus:border-red-400 focus:bg-white hover:bg-red-200 capitalize "
					}
					onClick={() => setShowModal1(!showModal1)}
				>
					{props.status}
				</button>
			</div>
			<div className={showModal1 ? "modal active" : "modal"}>
				<h2 className="font-medium text-lg text-center">
					Change Status ?
				</h2>
				<p className="text-center px-5 py-2">
					This will change the status of report
				</p>
				<div className="grid grid-cols-2">
					<button
						onClick={() => setShowModal1(!showModal1)}
						className="px-6 py-2 cursor-pointer text-center text-xs rounded-full bg-gray-100 text-base font-medium tracking-wide placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white hover:bg-gray-200 m-2"
					>
						Close
					</button>
					<button
						onClick={changeStatus}
						className={
							props.status === "pending"
								? "px-6 py-2 cursor-pointer text-center text-xs rounded-full text-base font-medium tracking-wide bg-green-600 text-white placeholder-green-500 focus:outline-none focus:border-green-400 focus:bg-white hover:bg-green-700 capitalize m-2"
								: "px-6 py-2 cursor-pointer text-center text-xs rounded-full text-base font-medium tracking-wide bg-red-600 text-white placeholder-red-500 focus:outline-none focus:border-red-400 focus:bg-white hover:bg-red-700 capitalize m-2"
						}
					>
						{props.status === "solved" ? "Pending" : "Solved"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ReportsList;
