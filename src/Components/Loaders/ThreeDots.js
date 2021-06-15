import React from "react";
import ContentLoader from "react-content-loader";

const ThreeDots = (props) => (
	<ContentLoader viewBox="0 0 472 220" {...props}>
		<circle cx="220" cy="110" r="5" />
		<circle cx="236" cy="110" r="5" />
		<circle cx="252" cy="110" r="5" />
	</ContentLoader>
);

export default ThreeDots;
