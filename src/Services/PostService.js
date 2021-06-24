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
	getPost: async (id) => {
		const response = await fetch(`/post/post/${id}`);
		return response.json().then((data) => data);
	},
	createPost: async (post) => {
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
	createComment: async (data, id) => {
		console.log(data, id);
		const response = await fetch(`/post/comment/${id}`, {
			method: "put",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.json().then((data) => data);
	},
	deleteComment: async (data) => {
		const response = await fetch(
			`/post/Deletecomment/${data.id}/${data.c_id}`,
			{
				method: "delete",
			}
		);
		return response.json().then((data) => data);
	},
	upvoteComment: async (id) => {
		const response = await fetch(`/post/comment/upvote/${id}`, {
			method: "put",
		});
		return response.json().then((data) => data);
	},
	downvoteComment: async (id) => {
		const response = await fetch(`/post/comment/downvote/${id}`, {
			method: "put",
		});
		return response.json().then((data) => data);
	},
	getPostComments: async (id) => {
		const response = await fetch(`/post/post/${id}/comments`);
		return response.json().then((data) => data);
	},
};
