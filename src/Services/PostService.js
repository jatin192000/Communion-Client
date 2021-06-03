/* eslint-disable import/no-anonymous-default-export */
export default {
	getAllPosts: async () => {
		const response = await fetch("/post/all");
		return response.json().then((data) => data);
	},
	getTimelinePosts: async () => {
		const response = await fetch("/post/timeline");
		return response.json().then((data) => data);
	},
	getDashboardPosts: async (username) => {
		const response = await fetch(`/post/dashboard/${username}`);
		return response.json().then((data) => data);
	},
	getCommunityDashboardPosts: async (username) => {
		const response = await fetch(`/post/dashboardCommunity/${username}`);
		return response.json().then((data) => data);
	},
	postPost: async (post) => {
		const response = await fetch("/post/create", {
			method: "post",
			body: JSON.stringify(post),
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.json().then((data) => data);
	},
	deletePost: async (id) => {
		const response = await fetch(`/post/delete/${id}`, {
			method: "delete",
		});
		return response.json().then((data) => data);
	},
	upvotePost: async (id) => {
		const response = await fetch(`/post/upvote/${id}`, {
			method: "put",
		});
		return response.json().then((data) => data);
	},
	downvotePost: async (id) => {
		const response = await fetch(`/post/downvote/${id}`, {
			method: "put",
		});
		return response.json().then((data) => data);
	},
};
