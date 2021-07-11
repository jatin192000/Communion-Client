import React, { useState, useEffect } from "react";
import AuthService from "../../Services/AuthService";
import Search from "./Search";

const SearchBar = (props) => {
	const [users, setUsers] = useState([]);
	const [term, setTerm] = useState("");
	const [filteredUsers, setFilteredUsers] = useState([]);
	useEffect(() => {
		AuthService.getAll().then((data) => {
			if (data.success) {
				setUsers(data.users);
			}
		});
	}, []);
	const onChange = (e) => {
		setTerm(e.target.value);
		if (e.target.value && users) {
			setFilteredUsers(
				users.filter((user) => {
					if (user["username"].includes(e.target.value)) return true;
					return false;
				})
			);
		}
	};

	return (
		<div className="col-start-6 col-span-4 px-4 py-0 my-auto">
			<input
				name="searchBox"
				placeholder="Search . . . ."
				className="py-2 w-full text-center rounded-full text-base font-medium bg-grey-100 border border-gray-500 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white"
				id="searchBox"
				onChange={onChange}
			/>
			<div className="dropdown relative inline-flex cursor-pointer">
				{filteredUsers.length > 0
					? filteredUsers.map((user) => {
							return (
								<Search username={user.username} show="true" />
							);
					  })
					: null}
			</div>
		</div>
	);
};

export default SearchBar;
