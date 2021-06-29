/* eslint-disable import/no-anonymous-default-export */
export default {
	login: async (user) => {
		return await fetch("/user/login", {
			method: "post",
			body: JSON.stringify(user),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((res) => {
			if (res.status !== 401) return res.json().then((data) => data);
			else
				return {
					isAuthenticated: false,
					user: { username: "", role: "", _id: "" },
				};
		});
	},
	register: async (user) => {
		return await fetch("/user/register", {
			method: "post",
			body: JSON.stringify(user),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => data);
	},
	delete: async (id) => {
		return await fetch(`/user/delete/${id}`, {
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
	follow: async (id) => {
		return await fetch(`/user/follow/${id}`, {
			method: "put",
		})
			.then((res) => res.json())
			.then((data) => data);
	},
	get: async (username) => {
		return await fetch(`/user/username/${username}`).then((res) => {
			return res.json().then((data) => data);
		});
	},
	getAll: async () => {
		return await fetch("/user/all").then((res) => {
			return res.json().then((data) => data);
		});
	},
	getById: async (id) => {
		return await fetch(`/user/id/${id}`).then((res) => {
			return res.json().then((data) => data);
		});
	},
	getProfile: async (id) => {
		return await fetch(`/user/profile/${id}`).then((res) => {});
	},
	getFollowers: async (username) => {
		return await fetch(`/user/followers/${username}`).then((res) => {
			return res.json().then((data) => data);
		});
	},
	update: async (userData) => {
		return await fetch(`/user/update/${userData.id}`, {
			method: "put",
			body: JSON.stringify(userData.user),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((res) => {
			return res.json().then((data) => data);
		});
	},
	logout: async () => {
		return await fetch("/user/logout").then((res) => {
			return res.json().then((data) => data);
		});
	},
	isAuthenticated: async () => {
		return await fetch("/user/authenticated").then((res) => {
			if (res.status !== 401) return res.json().then((data) => data);
			else
				return {
					isAuthenticated: false,
					user: { username: "", role: "" },
				};
		});
	},
	forgotpassword: async (userData) => {
		return await fetch("/user/forgotpassword", {
			method: "post",
			body: userData,
			headers: {
				"Content-Type": "application/json",
			},
		}).then((res) => {
			return res.json().then((data) => data);
		});
	},
	resetPassword: async (password) => {
		return await fetch(`/user/passwordreset/${password.resetToken}`, {
			method: "put",
			body: JSON.stringify(password),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((res) => {
			return res.json().then((data) => data);
		});
	},
	changePassword: async (password) => {
		return await fetch(`/user/updatePassword`, {
			method: "put",
			body: JSON.stringify(password),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((res) => {
			return res.json().then((data) => data);
		});
	},
	changeEmail: async (data) => {
		return await fetch(`/user/updateEmail`, {
			method: "put",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((res) => {
			return res.json().then((data) => data);
		});
	},
	uploadProfile: async (data) => {
		return await fetch(`/user/uploadProfile`, {
			method: "post",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}).then((res) => {
			return res.json().then((data) => data);
		});
	},
	uploadCover: async (id, data) => {
		return await fetch(`/user/uploadCover/${id}`, {
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
