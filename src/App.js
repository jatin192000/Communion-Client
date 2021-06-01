import { useState, useLayoutEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import CreatePost from "./Components/Posts/CreatePost";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Home from "./Components/Home/Home";
import Admin from "./Components/Admin/Admin";
import Profile from "./Components/Profile/Profile";
import PrivateRoute from "./hocs/PrivateRoute";
import UnPrivateRoute from "./hocs/UnPrivateRoute";
import { GiHamburgerMenu } from "react-icons/gi";
import Trending from "./Components/Trending/Trending";
import "react-toastify/dist/ReactToastify.css";
import EditProfile from "./Components/Profile/EditProfile";
import ForgotPassword from "./Components/Auth/ForgetPassword";
import ResetPassword from "./Components/Auth/ResetPassword";

function useMediaQuery() {
	const [screenSize, setScreenSize] = useState([0, 0]);

	useLayoutEffect(() => {
		function updateScreenSize() {
			setScreenSize([window.innerWidth, window.innerHeight]);
		}
		window.addEventListener("resize", updateScreenSize);
		updateScreenSize();
		return () => window.removeEventListener("resize", updateScreenSize);
	}, []);

	return screenSize;
}

function App() {
	const [showNav, setShowNav] = useState(false);
	const [width] = useMediaQuery();
	return (
		<Router>
			<div className="flex">
				<div className="sidebar">
					<header>
						{width < 769 ? (
							<GiHamburgerMenu
								className="fill-current text-yellow-500"
								onClick={() => setShowNav(!showNav)}
							/>
						) : null}
					</header>
					{width < 769 ? (
						<Navbar show={showNav} />
					) : (
						<Navbar show={true} />
					)}
				</div>
				<div className="main">
					<PrivateRoute
						exact
						path="/"
						roles={["user", "admin"]}
						component={Home}
					/>
					<Route exact path="/user/:username" component={Profile} />
					<Route
						exact
						path="/forgotpassword"
						component={ForgotPassword}
					/>
					<Route
						path="/passwordreset/:resetLink"
						component={ResetPassword}
					/>
					<Route exact path="/trending" component={Trending} />
					<UnPrivateRoute path="/login" component={Login} />
					<UnPrivateRoute path="/register" component={Register} />
					<PrivateRoute
						path="/createPost"
						roles={["user", "admin"]}
						component={CreatePost}
					/>
					<PrivateRoute
						exact
						path="/user/:username/editProfile"
						roles={["user", "admin"]}
						component={EditProfile}
					/>
					<PrivateRoute
						path="/admin"
						roles={["admin"]}
						component={Admin}
					/>
				</div>
			</div>
		</Router>
	);
}

export default App;
