/*
 * COMMON CONSTANTS
 * ----------------
 */

export const APP_COLORS = {
  confirmed: "#5E9CEA",
  recovered: "#35BA9B",
  deaths: "#D94452",
};


/*
 * COMMON HELPERS
 * ----------------
 */

// capitalize first letter
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// format big numbers to K format, (10 500 => 10.5K)
export const kFormatter = (number, startFrom = 999) => {
  return Math.abs(number) > startFrom
    ? Math.sign(number) * (Math.abs(number) / 1000).toFixed(1) + "k"
    : Math.sign(number) * Math.abs(number);
};


/*
 * APP RELATED HELPERS
 * -------------------
 */

// Because the used API returns data by locations (location can be country or province) and not countries
export const extractCountriesFromLocations = (locations) => {
  const countries = [];

  for (let i = 0; i < locations.length; ++i) {
    const loc = locations[i];
    const name = loc.country;
    const code = loc.country_code;

    if (countries.find((c) => c.name === name)) {
      continue;
    }

    let confirmedCases = 0;
    let deathsCases = 0;
    let recoveredCases = 0;

    const provinces = locations.filter(
      (l) => loc.country_code === l.country_code
    );

    provinces.forEach((loc) => {
      confirmedCases += loc.latest.confirmed;
      deathsCases += loc.latest.deaths;
      recoveredCases += loc.latest.recovered;
    });

    countries.push({
      name,
      code,
      cases: {
        confirmed: confirmedCases,
        deaths: deathsCases,
        recovered: recoveredCases,
      },
    });
  }

  return countries;
};

// Sort countries by a cases/order
export const sortCountries = (countries, sortOptions = {}) => {
  const toSortCountries = countries.slice(0);
  const { by: sortBy = "cases", order: sortOrder = "desc" } = sortOptions;

  toSortCountries.sort((a, b) => {
    if (sortBy === "cases") {
      return sortOrder === "desc"
        ? b.cases.confirmed - a.cases.confirmed
        : a.cases.confirmed - b.cases.confirmed;
    }

    if (sortBy === "name") {
      return sortOrder === "desc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }

    return 0;
  });

  return toSortCountries;
};

// Filter a given set of countries by name
export const filterCountriesByName = (countries, name) => {
  return countries.filter((c) =>
    c.name.toLowerCase().includes(name.trim().toLowerCase())
  );
};

// Extract/prepare data to be used directly with corresponding LineChart component
export const extractTimelinesChartData = (timelines) => {
  const data = [];
  const confirmedTL = timelines.confirmed.timeline;
  const recoveredTL = timelines.recovered.timeline;
  const deathsTL = timelines.deaths.timeline;

  // let infectionStarted = false;
  for (let date in confirmedTL) {
    if (confirmedTL[date] === 0) {
      continue;
    }

    data.push({
      date: new Date(date).toLocaleDateString(),
      confirmed: confirmedTL[date],
      recovered:
        typeof recoveredTL[date] === "undefined" ? 0 : recoveredTL[date],
      deaths: deathsTL[date],
    });
  }

  return data;
};

// Extract/prepare data to be used directly with corresponding PieChart component
export const extractLatestCasesChartData = (latest) => {
  const { confirmed, recovered, deaths } = latest;
  
  return [
    { name: "Active Cases", value: confirmed - recovered - deaths },
    { name: "Recovered", value: recovered },
    { name: "Deaths", value: deaths },
  ];
};
