/* eslint-disable import/no-anonymous-default-export */
export default {
	create: async (community) => {
		return await fetch("/community/create", {
			method: "post",
			body: JSON.stringify(community),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => data);
	},
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
	createPost: async (post) => {
		const response = await fetch(`/community/createPost/${post.username}`, {
			method: "post",
			body: JSON.stringify(post),
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.json().then((data) => data);
	},
	get: async (username) => {
		return await fetch(`/community/community/${username}`).then((res) => {
			return res.json().then((data) => data);
		});
	},
	getAll: async () => {
		return await fetch("/community/all").then((res) => {
			return res.json().then((data) => data);
		});
	},
	getById: async (id) => {
		return await fetch(`/community/communityID/${id}`).then((res) => {
			return res.json().then((data) => data);
		});
	},
	follow: async (username) => {
		return await fetch(`/community/follow/${username}`, {
			method: "put",
		})
			.then((res) => res.json())
			.then((data) => data);
	},
	update: async (userData, id) => {
		return await fetch(`/community/update/${id}`, {
			method: "put",
			body: JSON.stringify(userData),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((res) => {
			return res.json().then((data) => data);
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
