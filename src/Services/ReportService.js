/* eslint-disable import/no-anonymous-default-export */
export default {
	report: async (id, type, reason) => {
		return await fetch(`/report/create/${type}/${id}`, {
			method: "post",
			body: JSON.stringify({ reason: reason }),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((res) => {
			return res.json().then((data) => data);
		});
	},
};
