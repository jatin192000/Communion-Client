import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../Services/AuthService";
import { AuthContext } from "../../Context/AuthContext";
import { BsHouseDoor } from "react-icons/bs";
import { FiTrendingUp } from "react-icons/fi";
import { VscAccount } from "react-icons/vsc";
import "./Navbar.css";

const Navbar = ({ show }) => {
	const { isAuthenticated, user, setIsAuthenticated, setUser } =
		useContext(AuthContext);

	const onClickLogoutHandler = () => {
		try {
			AuthService.logout().then((data) => {
				if (data.success) {
					setUser(data.user);
					setIsAuthenticated(false);
				}
			});
		} catch (error) {
			console.log(error.message);
		}
	};

	const unauthenticatedNavBar = () => {
		return (
			<>
				<li>
					<Link
						to="/trending"
						className="flex flex-row place-content-center"
					>
						<FiTrendingUp className="mt-1 mr-1" />
						Trending
					</Link>
				</li>
				<li>
					<Link
						to="/login"
						className="flex flex-row place-content-center"
					>
						Login
					</Link>
				</li>
				<li>
					<Link
						to="/register"
						className="flex flex-row place-content-center"
					>
						Register
					</Link>
				</li>
			</>
		);
	};

	const authenticatedNavBar = () => {
		return (
			<>
				<li>
					<Link to="/" className="flex flex-row place-content-center">
						<BsHouseDoor className="mt-1 mr-1" />
						Home
					</Link>
				</li>
				<li>
					<Link
						to="/trending"
						className="flex flex-row place-content-center"
					>
						<FiTrendingUp className="mt-1 mr-1" />
						Trending
					</Link>
				</li>
				<li>
					<Link
						to={`/user/${user.username}`}
						className="flex flex-row place-content-center"
					>
						<VscAccount className="mt-1 mr-1" />
						Profile
					</Link>
				</li>
				{user.role === "admin" ? (
					<li>
						<Link
							to="/admin"
							className="flex flex-row place-content-center"
						>
							Admin
						</Link>
					</li>
				) : null}
				<li>
					<Link
						onClick={onClickLogoutHandler}
						className="flex flex-row place-content-center"
					>
						Logout
					</Link>
				</li>
			</>
		);
	};
	return (
		<div className={show ? "sidenav active clearfix" : "sidenav clearfix"}>
			<ul>
				{!isAuthenticated
					? unauthenticatedNavBar()
					: authenticatedNavBar()}
			</ul>
		</div>
	);
};

export default Navbar;
