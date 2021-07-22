/* eslint-disable import/no-anonymous-default-export */
export default {
	get: async () => {
		return await fetch(`/admin`).then((res) => {
			return res.json().then((data) => data);
		});
	},
	getUsers: async () => {
		return await fetch(`/admin/users`).then((res) => {
			return res.json().then((data) => data);
		});
	},
	getReports: async () => {
		return await fetch("/admin/reports").then((res) => {
			return res.json().then((data) => data);
		});
	},
	getReport: async (id) => {
		return await fetch(`/admin/report/${id}`).then((res) => {
			return res.json().then((data) => data);
		});
	},
	deleteUser: async (id) => {
		return await fetch(`/user/delete/${id}`, {
			method: "delete",
		}).then((res) => {
			return res.json().then((data) => data);
		});
	},
	changeUserRole: async (id) => {
		return await fetch(`/admin/user/role/${id}`, {
			method: "put",
			headers: {
				"Content-Type": "application/json",
			},
		}).then((res) => {
			return res.json().then((data) => data);
		});
	},
	changeReportStatus: async (id) => {
		return await fetch(`/admin/report/status/${id}`, {
			method: "put",
			headers: {
				"Content-Type": "application/json",
			},
		}).then((res) => {
			return res.json().then((data) => data);
		});
	},
};
