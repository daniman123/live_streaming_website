import axios from "axios";
import React, { useEffect, useRef,useState } from "react";
import SearchBarDropdown from "./components/searchDropdown/index"


function Search() {
  const [searchQueryRecomendations, setSearchQueryRecomendations] = useState([])
const searchBarInput = useRef()

  async function runQuery(searchQuery){

    if (searchQuery.length == 0) {
      setSearchQueryRecomendations([])
      return
    }
      try {
        const response = await axios.post('http://localhost:9000/query', {
          query: searchQuery,
        });

        setSearchQueryRecomendations(prevState => prevState=response.data)
        console.log("🚀 ~ file: index.js:19 ~ runQuery ~ response:", response.data)
      } catch (error) {
        console.log("🚀 ~ file: index.js:21 ~ runQuery ~ error:", error)
        
      }
  }  
  

  return (
    <div className="search-bar">
      <div className="search-bar-container">
        <div className="input__content">
        <input ref={searchBarInput} onChange={(e)=>runQuery(e.target.value)} className="search-bar-input" placeholder="Search"></input>
        {<SearchBarDropdown results={searchQueryRecomendations}/>}
        </div>
      </div>
      <div className="search-bar-btn-container">
        <button className="search-bar-button">search</button>
      </div>
    </div>
  );
}

export default Search;
