import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import AdminService from "../../Services/AdminService";

const Report = (props) => {
	const id = useParams().id;
	const [report, setReport] = useState(null);
	useEffect(() => {
		AdminService.getReport(id).then((data) => {
			setReport(data.report);
		});
	}, [id]);
	return (
		<div className="text-sm md:text-base font-medium">
			{report ? (
				<div className="m-5">
					<div className="text-center">
						<span className="text-2xl">Report</span>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="mt-5 p-2 font-semibold bg-gray-200 text-dark py-4 rounded-lg flex focus:shadow-outline focus:outline-none">
							ID: {id}
						</div>
						<div className="mt-5 p-2 font-semibold bg-gray-200 text-dark py-4 rounded-lg flex focus:shadow-outline focus:outline-none">
							Type: {report.type.for}
						</div>
						<div className="mt-5 p-2 font-semibold bg-gray-200 text-dark py-4 rounded-lg flex focus:shadow-outline focus:outline-none">
							Reported On: {report.createdAt}
						</div>
						<div className="mt-5 p-2 font-semibold bg-gray-200 text-dark py-4 rounded-lg flex focus:shadow-outline focus:outline-none">
							{report.type.for} id: {report.type.id}
						</div>
						<div className="mt-5 p-2 font-semibold bg-gray-200 text-dark py-4 rounded-lg flex focus:shadow-outline focus:outline-none">
							Status: {report.status}
						</div>
						<div className="mt-5 p-2 font-semibold bg-gray-200 text-dark py-4 rounded-lg flex focus:shadow-outline focus:outline-none">
							No. of users that reported: {report.author.length}
						</div>
						<div className="col-span-2 grid grid-cols-1 mt-5 p-2 font-semibold bg-gray-200 text-dark py-4 rounded-lg flex focus:shadow-outline focus:outline-none">
							<span className="text-lg text-center mb-5">
								Reported By:{" "}
							</span>
							<div className="grid grid-cols-1">
								{report.author.map((v1) => {
									return (
										<div className="grid grid-cols-2">
											<Link
												to={`/user/${v1.username}`}
												className="mx-auto"
											>
												<h3>
													Username : {v1.username}
												</h3>
											</Link>
											<h3>Reason : {v1.reason}</h3>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
};

export default Report;
