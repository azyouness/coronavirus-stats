import React from "react";
import CountryItem from "./CountryItem";

const CountriesList = ({ items, activeItem, onItemClick }) => {
  return (
    <ul style={{ padding: 0, margin: 0 }}>
      {items.map((country) => (
        <CountryItem
          key={country.name}
          country={country}
          onClick={() => onItemClick(country)}
          isActive={activeItem.name === country.name}
        />
      ))}
    </ul>
  );
};

export default CountriesList;
