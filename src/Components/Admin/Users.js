import React, { useState, useEffect } from "react";
import UsersList from "./UsersList";
import AdminService from "../../Services/AdminService";

const Users = (props) => {
	const [users, setUsers] = useState([]);
	useEffect(() => {
		AdminService.getUsers().then((data) => {
			setUsers(data.users);
		});
	}, []);

	return (
		<div className="grid grid-cols-1">
			{users
				? users.map((v1) => {
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
