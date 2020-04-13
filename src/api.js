import "whatwg-fetch";

/* Experiencing issues contacting the API
 * https://github.com/ExpDev07/coronavirus-tracker-api/issues/248  */
// const API_URL = "https://covid-tracker-us.herokuapp.com/v2";
const API_URL = process.env.REACT_APP_API_URL;

export const loadLatest = async () => {
  const res = await fetch(`${API_URL}/latest`);
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
};

export const loadLocations = async () => {
  const res = await fetch(`${API_URL}/locations?timelines=false&source=jhu`);
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
};

export const loadLocationsByCountry = async ({ countryCode }) => {
  const res = await fetch(
    `${API_URL}/locations?timelines=true&country_code=${countryCode}`
  );
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
};
