/* eslint-disable import/no-anonymous-default-export */
import React, { createContext, useState, useEffect } from "react";
import AuthService from "../Services/AuthService";
import ThreeDots from "../Components/Loaders/ThreeDots";

export const AuthContext = createContext();

export default ({ children }) => {
	const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		AuthService.isAuthenticated().then((data) => {
			if (data.success) {
				setUser(data.user);
				setIsAuthenticated(data.isAuthenticated);
				setIsLoaded(true);
			} else {
				setUser(data.user);
				setIsAuthenticated(false);
				setIsLoaded(true);
			}
		});
	}, []);

	return (
		<div>
			{!isLoaded ? (
				<ThreeDots />
			) : (
				<AuthContext.Provider
					value={{
						user,
						setUser,
						isAuthenticated,
						setIsAuthenticated,
					}}
				>
					{children}
				</AuthContext.Provider>
			)}
		</div>
	);
};
