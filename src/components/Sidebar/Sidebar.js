import React, { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
// components
import SidebarButton from "./SidebarButton";
import SearchBox from "./../SearchBox";
import CountriesList from "./../CountriesList";
// utils, styles, ...
import { filterCountriesByName, sortCountries } from "./../../utils";
import styles from "./Sidebar.module.scss";


export default ({ open, onToggleButtonClick, countries, onSelectedCountryChanged }) => {
  const defaultSort = { by: "cases", order: "desc" };
  const [sortedCountries, setSortedCountries]   = useState(sortCountries(countries, defaultSort));
  const [filtredCountries, setFiltredCountries] = useState(sortedCountries);
  const [sortValue, setSortValue]               = useState(defaultSort);
  const [selectedCountry, setSelectedCountry]   = useState({});

  
  const handleFilterValueChange = value => {
    if (value.trim() === "") {
      setFiltredCountries(sortedCountries);
      setSelectedCountry({});
      onSelectedCountryChanged({});
    } else {
      setFiltredCountries(filterCountriesByName(sortedCountries, value));
    }
  };


  const handleSortChange = value => {
    const { by, order } = sortValue;
    const newSort = value === "" 
      ? defaultSort
      : { by: value, order: by === value ? (order === "desc" ? "asc" : "desc") : "desc" };
    setSortValue(newSort);
    setFiltredCountries(sortCountries(filtredCountries, newSort));
    setSortedCountries(sortCountries(sortedCountries, newSort)); // to avoid sorting in filterChange
  };


  const handleCountryItemClick = country => {
    const newSelectedCountry = country.code === selectedCountry.code ? {} : country;
    setSelectedCountry(newSelectedCountry);
    onSelectedCountryChanged(newSelectedCountry);
  };


  const handlePressEnter = () => {
    // on enter press select first element
    const newSelectedCountry = filtredCountries[0];
    if(newSelectedCountry) {
      setSelectedCountry(newSelectedCountry);
      onSelectedCountryChanged(newSelectedCountry);
    }
  };

  return (
    <aside className={styles.sidebar}>
      <SidebarButton 
        open={open} 
        onClick={onToggleButtonClick} 
      />

      <div className={styles.search}>
        <SearchBox
          selectedCountry={selectedCountry}
          onFilterChange={handleFilterValueChange}
          sortValue={sortValue}
          onSortChange={handleSortChange}
          onEnterPress={handlePressEnter}
        />
      </div>

      <div className={styles.list}>
        <PerfectScrollbar>
          <CountriesList
            items={filtredCountries}
            onItemClick={handleCountryItemClick}
            activeItem={selectedCountry}
          />
        </PerfectScrollbar>
      </div>
    </aside>
  );
};
