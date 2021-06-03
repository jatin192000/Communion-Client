/* eslint-disable import/no-anonymous-default-export */
export default {
	delete: async (id) => {
		return await fetch(`/community/delete/${id}`, {
			method: "delete",
		}).then((res) => {
			if (res.status !== 401) return res.json().then((data) => data);
			else
				return {
					isAuthenticated: false,
					user: { username: "", role: "" },
				};
		});
	},
	get: async (username) => {
		return await fetch(`/community/${username}`).then((res) => {
			if (res.status === 200) return res.json().then((data) => data);
			else return {};
		});
	},
	update: async (userData, id) => {
		return await fetch(`/community/update/${id}`, {
			method: "post",
			body: JSON.stringify(userData),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((res) => {
			if (res.status === 200) return res.json().then((data) => data);
			else return {};
		});
	},
	uploadProfile: async (id, data) => {
		return await fetch(`/community/uploadProfile/${id}`, {
			method: "put",
			body: data,
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}).then((res) => {
			return res.json().then((data) => data);
		});
	},
	uploadCover: async (id, data) => {
		return await fetch(`/ommunity/uploadCover/${id}`, {
			method: "put",
			body: data,
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}).then((res) => {
			return res.json().then((data) => data);
		});
	},
};
