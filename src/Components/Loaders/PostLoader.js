import React from "react";
import ContentLoader from "react-content-loader";

const PostLoader = (props) => (
	<ContentLoader viewBox="0 0 473 220" {...props}>
		<rect x="48" y="8" width="88" height="3" rx="3" />
		<rect x="48" y="20" width="52" height="3" rx="3" />
		<rect x="0" y="42" width="410" height="3" rx="3" />
		<rect x="0" y="60" width="380" height="3" rx="3" />
		<rect x="0" y="78" width="178" height="3" rx="3" />
		<circle cx="20" cy="20" r="15" />

		<rect x="48" y="130" width="88" height="3" rx="3" />
		<rect x="48" y="142" width="52" height="3" rx="3" />
		<rect x="0" y="162" width="410" height="3" rx="3" />
		<rect x="0" y="182" width="380" height="3" rx="3" />
		<rect x="0" y="200" width="178" height="3" rx="3" />
		<circle cx="20" cy="142" r="15" />
	</ContentLoader>
);

export default PostLoader;
