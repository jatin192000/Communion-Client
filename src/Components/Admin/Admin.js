import React, { useEffect, useState } from "react";
import AdminService from "../../Services/AdminService";
import { Link } from "react-router-dom";
import LineChart from "./LineChart";

const Admin = () => {
	const [count, setCount] = useState([
		{ userCount: 0 },
		{ postCount: 0 },
		{ communityCount: 0 },
		{ reportCount: 0 },
	]);
	const [Data, setData] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		AdminService.get().then((data) => {
			if (data.success) {
				setCount(data.count);
				setData(data.data);
				setLoading(true);
			}
		});
	}, []);

	return loading ? (
		<div className="p-5">
			<div className="flex justify-center mt-5">
				<h className="text-3xl">Dashboard</h>
			</div>
			<div className="text-xl w-full grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
				<Link
					to="/admin/users"
					className="py-10 font-semibold bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-lg flex items-center justify-center focus:outline-none"
				>
					Users: {count ? count[0].userCount : 0}
				</Link>
				<Link
					to="/trending"
					className="py-10 font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg flex items-center justify-center focus:outline-none"
				>
					Posts: {count ? count[1].postCount : 0}
				</Link>
				<Link
					to="/admin/communities"
					className="py-10 font-semibold bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-500 hover:to-red-600 text-white rounded-lg flex items-center justify-center focus:outline-none"
				>
					Communities: {count ? count[2].communityCount : 0}
				</Link>
				<Link
					to="/admin/reports"
					className="py-10 font-semibold text-white rounded-lg flex items-center justify-center focus:outline-none customReport"
				>
					Reports: {count ? count[3].reportCount : 0}
				</Link>
			</div>
			<div className="h-1/3">
				<LineChart Data={Data} />
			</div>
		</div>
	) : null;
};

export default Admin;
