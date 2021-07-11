import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = (props) => {
	var d = new Date();
	var y = d.getFullYear();
	var m = d.getMonth();

	const MONTHS = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const months = (config) => {
		var cfg = config || {};
		var count = cfg.count || 12;
		var section = cfg.section;
		var values = [];
		var i, value;

		for (i = 0; i < count; ++i) {
			value = MONTHS[Math.ceil(i) % 12];
			values.push(value.substring(0, section));
		}

		return values;
	};
	const labels = months({ count: m + 1 });
	const data = {
		labels: labels,
		datasets: [
			{
				label: "Users Joined",
				backgroundColor: "rgba(255, 99, 132, 0.2)",
				borderColor: "rgba(255, 99, 132, 1)",
				fill: "start",
				data: props.Data.users.splice(0, m + 1),
			},
			{
				label: "Posts Created",
				backgroundColor: "rgba(54, 162, 235, 0.2)",
				borderColor: "rgba(54, 162, 235, 1)",
				fill: "start",
				data: props.Data.posts.splice(0, m + 1),
			},
			{
				label: "Communities Created",
				backgroundColor: "rgba(255, 206, 86, 0.2)",
				borderColor: "rgba(255, 206, 86, 1)",
				fill: "start",
				data: props.Data.communities.splice(0, m + 1),
			},
			{
				label: "Reports By Users",
				backgroundColor: "rgba(75, 192, 192, 0.2)",
				borderColor: "rgba(75, 192, 192, 1)",
				fill: "start",
				data: props.Data.reports.splice(0, m + 1),
			},
			{
				label: "Comments Created",
				backgroundColor: "rgba(153, 102, 255, 0.2)",
				borderColor: "rgba(153, 102, 255, 1)",
				fill: "start",
				data: props.Data.comments.splice(0, m + 1),
			},
		],
	};
	const options = {
		plugins: {
			title: {
				text: "Timeline",
				display: true,
			},
		},
		scales: {
			x: {
				title: {
					display: true,
					text: `Months in ${y}`,
				},
			},
			y: {
				type: "linear",
				title: {
					display: true,
					text: "Numbers",
				},
				beginAtZero: true,
			},
		},
	};

	return <Line data={data} options={options}></Line>;
};

export default LineChart;
