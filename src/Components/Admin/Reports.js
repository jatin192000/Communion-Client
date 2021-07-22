import React, { useState, useEffect } from "react";
import ReportsList from "./ReportsList";
import AdminService from "../../Services/AdminService";

const Reports = (props) => {
	const [reports, setReports] = useState([]);
	useEffect(() => {
		AdminService.getReports().then((data) => {
			setReports(data.reports);
		});
	}, []);

	return (
		<div className="grid grid-cols-1">
			<div className="mx-auto font-semibold text-3xl mb-2">Reports</div>
			<div className="post-bottom" />
			<div className="grid grid-cols-6 text-md md:text-lg p-5 font-medium">
				<span className="mx-auto">Type</span>
				<span className="mx-auto">Count</span>
				<span className="col-span-2 mx-auto">ID</span>
				<span className="mx-auto">Reported On</span>
				<span className="mx-auto">Status</span>
			</div>
			<div className="post-bottom mb-2" />
			{reports
				? reports.map((v1) => {
						return (
							<ReportsList
								key={v1._id}
								id={v1._id}
								for={v1.type.for}
								for_id={v1.type.id}
								reason={v1.reason}
								status={v1.status}
								createdAt={v1.createdAt}
								author={v1.author}
							/>
						);
				  })
				: null}
		</div>
	);
};

export default Reports;
