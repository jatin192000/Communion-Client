import React from "react";
import { Link } from "react-router-dom";
const Search = (props) => {
	return (
		<div
			className={`dropdown-menu flex flex-col ${
				!props.show ? "hidden" : ""
			} absolute`}
		>
			<div className="rounded flex flex-col flex-grow bg-gray-400 divide-y divide-gray-200">
				<div className="dropdown-item flex">
					<Link
						to={`user/${props.username}`}
						className="dropdown-link flex flex-grow px-4 py-3 text-gray-800 whitespace-no-wrap rounded hover:bg-gray-800 hover:text-white"
					>
						{props.username}
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Search;
