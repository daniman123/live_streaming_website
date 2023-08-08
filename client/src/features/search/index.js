import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import SearchBarDropdown from "./components/searchDropdown/index";

function Search() {
	const [isFocused, setIsFocused] = useState(false);
	const [searchQueryRecomendations, setSearchQueryRecomendations] = useState(
		[]
	);
	const searchBarInput = useRef();
	const searchContainerRef = useRef(null);

	async function runQuery(searchQuery) {
		if (searchQuery.length == 0) {
			setSearchQueryRecomendations([]);
			return;
		}
		try {
			const response = await axios.post(
				"http://localhost:9000/database-queries/search-query",
				{
					query: searchQuery,
				}
			);

			const responseArr = Object.values(response.data);

			setSearchQueryRecomendations((prevState) => (prevState = responseArr));
		} catch (error) {
			console.log("🚀 ~ file: index.js:21 ~ runQuery ~ error:", error);
		}
	}

	useEffect(() => {
		function handleClickOutside(event) {
			if (
				searchContainerRef.current &&
				searchContainerRef.current.contains(event.target)
			) {
				setIsFocused((prevState) => (prevState = true));
			}
			if (
				searchContainerRef.current &&
				!searchContainerRef.current.contains(event.target)
			) {
				setIsFocused((prevState) => (prevState = false));
			}
		}

		window.addEventListener("click", handleClickOutside);

		return () => {
			window.removeEventListener("click", handleClickOutside);
		};
	}, []);

	return (
		<div className="search-bar" ref={searchContainerRef}>
			<div className="search-bar-container">
				<div className="input__content">
					<input
						ref={searchBarInput}
						onChange={(e) => runQuery(e.target.value)}
						className="search-bar-input"
						placeholder="Search"
					></input>
					{isFocused ? (
						<SearchBarDropdown results={searchQueryRecomendations} />
					) : null}
				</div>
			</div>
			<div className="search-bar-btn-container">
				<button className="search-bar-button">search</button>
			</div>
		</div>
	);
}

export default Search;
