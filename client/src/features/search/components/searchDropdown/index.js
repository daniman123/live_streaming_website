import React from "react";

const SearchBarDropdown = ({ results }) => {
	const mapResults = () => {
		return results[0].map((value, index) => (
			<div key={index + value} className="dropdown__result__element__wrapper">
				<div className="dropdown__result__element">{value}</div>
			</div>
		));
	};

	return (
		<>
			{results[0]?.length > 0 ? (
				<div className="searchbar__dropdown">{mapResults()}</div>
			) : null}
		</>
	);
};

export default SearchBarDropdown;
