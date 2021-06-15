import React from "react";
import ContentLoader from "react-content-loader";

const ProfileLoader = (props) => {
	return (
		<ContentLoader
			speed={1}
			viewBox="0 0 1000 500"
			backgroundColor="#f3f3f3"
			foregroundColor="#ecebeb"
			{...props}
		>
			<rect x="0" y="13" rx="0" ry="0" width="2" height="600" />
			<rect x="999" y="15" rx="0" ry="0" width="2" height="600" />
			<circle cx="500" cy="230" r="75" />
			<rect x="0" y="13" rx="0" ry="0" width="1000" height="215" />
			<rect x="0" y="499" rx="0" ry="0" width="1000" height="2" />
		</ContentLoader>
	);
};
export default ProfileLoader;
