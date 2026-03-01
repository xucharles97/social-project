import React, { useState, useEffect } from "react";
import { SEARCH_KEY } from "../constants";
import SearchBar from "./SearchBar";

function Collection(props) {
  const [searchOption, setSearchOption] = useState({
    type: SEARCH_KEY.all,
    keyword: "",
  });

  const handleSearch = (option) => {
    setSearchOption(option);
  };

  return (
    <div className="home">
      <SearchBar handleSearch={handleSearch} />
    </div>
  );
}

export default Collection;
