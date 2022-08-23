import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

import { options } from "./api";

//import styles....
import styles from "./Search.module.css";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const onChangeHandler = (SearchData) => {
    setSearch(SearchData);
    onSearchChange(SearchData);
  };

  const loadOptions = async (inputValue) => {
    try {
      const response = await fetch(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${inputValue}&limit=10`,
        options
      );
      const response_1 = await response.json();
      return {
        options: response_1.data.map((city) => {
          return {
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
          };
        }),
      };
    } catch (err) {
      return console.error(err);
    }
  };
  return (
    <div className={styles.container}>
      <AsyncPaginate
        debounceTimeout={500}
        placeholder="Type your city name"
        onChange={onChangeHandler}
        value={search}
        loadOptions={loadOptions}
      />
    </div>
  );
};

export default Search;
