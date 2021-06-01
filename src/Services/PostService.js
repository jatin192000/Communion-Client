/* eslint-disable import/no-anonymous-default-export */
export default {
	getAllPosts: async () => {
		const response = await fetch("/post/all");
		if (response.status !== 401) {
			return response.json().then((data) => data);
		} else return { message: { msgBody: "UnAuthorized", msgError: true } };
	},
	getTimelinePosts: async () => {
		const response = await fetch("/post/timeline");
		if (response.status !== 401) {
			return response.json().then((data) => data);
		} else return { message: { msgBody: "UnAuthorized", msgError: true } };
	},
	getDashboardPosts: async (username) => {
		const response = await fetch(`/post/dashboard/${username}`);
		if (response.status !== 401) {
			return response.json().then((data) => data);
		} else return { message: { msgBody: "UnAuthorized", msgError: true } };
	},
	postPost: async (post) => {
		const response = await fetch("/post/create", {
			method: "post",
			body: JSON.stringify(post),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response.status !== 401) {
			return response.json().then((data) => data);
		} else return { message: { msgBody: "UnAuthorized" }, msgError: true };
	},
	deletePost: async (id) => {
		const response = await fetch(`/post/delete/${id}`, {
			method: "delete",
		});
		if (response.status !== 403) {
			return response.json().then((data) => data);
		} else return { message: { msgBody: "UnAuthorized" }, msgError: true };
	},
	upvotePost: async (id) => {
		const response = await fetch(`/post/upvote/${id}`, {
			method: "put",
		});
		if (response.status !== 403) {
			return response.json().then((data) => data);
		} else return { message: { msgBody: "UnAuthorized" }, msgError: true };
	},
	downvotePost: async (id) => {
		const response = await fetch(`/post/downvote/${id}`, {
			method: "put",
		});
		if (response.status !== 403) {
			return response.json().then((data) => data);
		} else return { message: { msgBody: "UnAuthorized" }, msgError: true };
	},
};
