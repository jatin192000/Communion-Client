import React, { useState, useEffect } from "react";
import UsersList from "./UsersList";
import AdminService from "../../Services/AdminService";
import {
	TiArrowUnsorted,
	TiArrowSortedUp,
	TiArrowSortedDown,
} from "react-icons/ti";

const Users = (props) => {
	const [users, setUsers] = useState([]);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [sortByUsername, setSortByUsername] = useState(0);
	const [sortByEmail, setSortByEmail] = useState(0);
	const [sortByCreation, setSortByCreation] = useState(0);
	const [sortByRole, setSortByRole] = useState(0);

	useEffect(() => {
		AdminService.getUsers().then((data) => {
			setUsers(data.users);
			setFilteredUsers(data.users);
		});
	}, []);

	const SortByUsername = () => {
		if (sortByUsername === 0) {
			filteredUsers.sort((p1, p2) => {
				return p1.username.localeCompare(p2.username, "en", {
					sensitivity: "base",
				});
			});
			setSortByUsername(1);
		} else if (sortByUsername === 1) {
			filteredUsers.sort((p1, p2) => {
				return p2.username.localeCompare(p1.username, "en", {
					sensitivity: "base",
				});
			});
			setSortByUsername(2);
		} else {
			setSortByUsername(0);
			if (sortByCreation === 0) {
				filteredUsers.sort((p1, p2) => {
					return new Date(p1.createdAt) - new Date(p2.createdAt);
				});
			} else {
				filteredUsers.sort((p1, p2) => {
					return new Date(p2.createdAt) - new Date(p1.createdAt);
				});
			}
		}
	};
	const SortByEmail = () => {
		if (sortByEmail === 0) {
			filteredUsers.sort((p1, p2) => {
				return p1.email.localeCompare(p2.email, "en", {
					sensitivity: "base",
				});
			});
			setSortByEmail(1);
		} else if (sortByEmail === 1) {
			filteredUsers.sort((p1, p2) => {
				return p2.email.localeCompare(p1.email, "en", {
					sensitivity: "base",
				});
			});
			setSortByEmail(2);
		} else {
			setSortByEmail(0);
			if (sortByCreation === 0) {
				filteredUsers.sort((p1, p2) => {
					return new Date(p1.createdAt) - new Date(p2.createdAt);
				});
			} else {
				filteredUsers.sort((p1, p2) => {
					return new Date(p2.createdAt) - new Date(p1.createdAt);
				});
			}
		}
	};
	const SortByCreation = () => {
		if (sortByCreation === 0) {
			filteredUsers.sort((p1, p2) => {
				return new Date(p2.createdAt) - new Date(p1.createdAt);
			});
			setSortByCreation(1);
		} else {
			filteredUsers.sort((p1, p2) => {
				return new Date(p1.createdAt) - new Date(p2.createdAt);
			});
			setSortByCreation(0);
		}
	};
	const SortByRole = () => {
		if (sortByRole === 0) {
			filteredUsers.sort((p1, p2) => {
				return p1.role.localeCompare(p2.role, "en", {
					sensitivity: "base",
				});
			});
			setSortByRole(1);
		} else if (sortByRole === 1) {
			filteredUsers.sort((p1, p2) => {
				return p2.role.localeCompare(p1.role, "en", {
					sensitivity: "base",
				});
			});
			setSortByRole(2);
		} else {
			setSortByRole(0);
			if (sortByCreation === 0) {
				filteredUsers.sort((p1, p2) => {
					return new Date(p1.createdAt) - new Date(p2.createdAt);
				});
			} else {
				filteredUsers.sort((p1, p2) => {
					return new Date(p2.createdAt) - new Date(p1.createdAt);
				});
			}
		}
	};
	const onChange = (e) => {
		if (e.target.value && users) {
			setFilteredUsers(
				users.filter((user) => {
					if (user["username"].includes(e.target.value)) return true;
					else if (user["email"].includes(e.target.value))
						return true;
					return false;
				})
			);
		} else {
			setFilteredUsers(users);
		}
	};
	return (
		<div className="grid grid-cols-1">
			<div className="mx-auto font-normal text-3xl mb-2">Users</div>
			<div className="ml-auto mb-3">
				<input
					class="border-1 border-gray-500 bg-white h-10 px-5 pr-16 rounded-lg border text-sm focus:outline-none"
					name="searchBox"
					id="userSearchBox"
					placeholder="Search User"
					onChange={onChange}
				/>
			</div>
			<div className="post-bottom" />
			<div className="cursor-pointer grid grid-cols-12 text-md md:text-lg p-5 pl-8 font-medium">
				<div
					className="col-span-3 grid grid-cols-2"
					onClick={SortByUsername}
				>
					<span>Username</span>
					{sortByUsername === 0 ? (
						<TiArrowUnsorted className="my-auto" />
					) : sortByUsername === 1 ? (
						<TiArrowSortedUp className="my-auto" />
					) : (
						<TiArrowSortedDown className="my-auto" />
					)}
				</div>
				<div
					className="cursor-pointer col-span-3 grid grid-cols-2"
					onClick={SortByEmail}
				>
					<span>Email</span>
					{sortByEmail === 0 ? (
						<TiArrowUnsorted className="my-auto" />
					) : sortByEmail === 1 ? (
						<TiArrowSortedUp className="my-auto" />
					) : (
						<TiArrowSortedDown className="my-auto" />
					)}
				</div>
				<div
					className="cursor-pointer mx-auto col-span-4 grid grid-cols-2"
					onClick={SortByCreation}
				>
					<span>Created On</span>
					{sortByCreation === 0 ? (
						<TiArrowSortedUp className="my-auto" />
					) : (
						<TiArrowSortedDown className="my-auto" />
					)}
				</div>
				<div
					className="cursor-pointer grid grid-cols-2"
					onClick={SortByRole}
				>
					<span>Role</span>
					{sortByRole === 0 ? (
						<TiArrowUnsorted className="my-auto" />
					) : sortByRole === 1 ? (
						<TiArrowSortedUp className="my-auto" />
					) : (
						<TiArrowSortedDown className="my-auto" />
					)}
				</div>
				<span className="mx-auto">Delete</span>
			</div>
			<div className="post-bottom mb-2" />
			{filteredUsers
				? filteredUsers.map((v1) => {
						return (
							<UsersList
								key={v1._id}
								id={v1._id}
								username={v1.username}
								email={v1.email}
								role={v1.role}
								profile={v1.profilePicture}
								createdAt={v1.createdAt}
							/>
						);
				  })
				: null}
		</div>
	);
};

export default Users;
