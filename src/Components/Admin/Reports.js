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
							/>
						);
				  })
				: null}
		</div>
	);
};

export default Reports;
