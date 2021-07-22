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
import PageNotFound from "./PageNotFound";
import Followers from "./Components/Profile/Followers";
import CreateCommunity from "./Components/Community/CreateCommunity";
import CreateCommunityPost from "./Components/Community/CreatePost";
import Community from "./Components/Community/Community";
import Posts from "./Components/Posts/Posts";
import Communities from "./Components/Community/Communities";
import EditCommunity from "./Components/Community/EditCommunity";
import CommunityFollowers from "./Components/Community/Followers";
import Top from "./Components/Community/TopCommunities";
import Settings from "./Components/Settings/Settings";
import ChangePassword from "./Components/Settings/ChangePassword";
import SearchBar from "./Components/SearchBar/SearchBar";
import ChangeEmail from "./Components/Settings/ChangeEmail";
import SettingsCommunity from "./Components/Settings/Communities";
import CommunitySettings from "./Components/Settings/CommunitySettings";
import ChangeModerator from "./Components/Settings/ChangeModerator";
import ChangeAdmin from "./Components/Settings/ChangeAdmin";
import Users from "./Components/Admin/Users";
import AdminCommunities from "./Components/Admin/Communities";
import Reports from "./Components/Admin/Reports";
import Report from "./Components/Admin/Report";

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
					<header className="grid grid-cols-12 p-1 gap-2">
						{width < 769 ? (
							<GiHamburgerMenu
								className="fill-current text-yellow-500 m-auto"
								onClick={() => setShowNav(!showNav)}
							/>
						) : null}
						<SearchBar />
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
						path="/community/:username"
						component={Community}
					/>
					<PrivateRoute
						exact
						path="/community/:username/editProfile"
						roles={["user", "admin"]}
						component={EditCommunity}
					/>
					<PrivateRoute
						exact
						path="/settings"
						roles={["user", "admin"]}
						component={Settings}
					/>
					<PrivateRoute
						exact
						path="/settings/changePassword"
						roles={["user", "admin"]}
						component={ChangePassword}
					/>
					<PrivateRoute
						exact
						path="/settings/changeEmail"
						roles={["user", "admin"]}
						component={ChangeEmail}
					/>
					<PrivateRoute
						exact
						path="/settings/communities"
						roles={["user", "admin"]}
						component={SettingsCommunity}
					/>
					<PrivateRoute
						exact
						path="/settings/community/:username"
						roles={["user", "admin"]}
						component={CommunitySettings}
					/>
					<PrivateRoute
						exact
						path="/settings/community/:username/changeModerator"
						roles={["user", "admin"]}
						component={ChangeModerator}
					/>
					<PrivateRoute
						exact
						path="/settings/community/:username/changeAdmin"
						roles={["user", "admin"]}
						component={ChangeAdmin}
					/>
					<Route exact path="/search" component={SearchBar} />
					<PrivateRoute
						exact
						path="/createCommunity"
						roles={["user", "admin"]}
						component={CreateCommunity}
					/>
					<PrivateRoute
						exact
						path="/communities"
						roles={["user", "admin"]}
						component={Communities}
					/>
					<PrivateRoute
						exact
						path="/community/:username/createPost"
						component={CreateCommunityPost}
						roles={["user", "admin"]}
					/>
					<PrivateRoute
						exact
						path="/community/:username/followers"
						component={CommunityFollowers}
						roles={["user", "admin"]}
					/>
					<Route
						exact
						path="/user/followers/:username"
						component={Followers}
					/>
					<Route exact path="/post/:id" component={Posts} />
					<Route
						exact
						path="/user/following/:username"
						component={Followers}
					/>
					<UnPrivateRoute
						exact
						path="/forgotpassword"
						component={ForgotPassword}
					/>
					<UnPrivateRoute
						path="/passwordreset/:resetLink"
						component={ResetPassword}
					/>
					<Route path="/error" component={PageNotFound} />
					<Route exact path="/trending" component={Trending} />
					<Route exact path="/top" component={Top} />
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
						exact
						path="/admin"
						roles={["admin"]}
						component={Admin}
					/>
					<PrivateRoute
						exact
						path="/admin/users"
						roles={["admin"]}
						component={Users}
					/>
					<PrivateRoute
						exact
						path="/admin/communities"
						roles={["admin"]}
						component={AdminCommunities}
					/>
					<PrivateRoute
						exact
						path="/admin/reports"
						roles={["admin"]}
						component={Reports}
					/>
					<PrivateRoute
						exact
						path="/report/:id"
						roles={["admin"]}
						component={Report}
					/>
				</div>
			</div>
		</Router>
	);
}

export default App;
