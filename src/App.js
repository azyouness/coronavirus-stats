import React, { useState } from "react";
import { useAsync } from "react-async";
// Components
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import AppLoading from "./components/Feedback/AppLoading";
import AppLoadingError from "./components/Feedback/AppLoadingError";
import RecoveryNotification from "./components/Feedback/RecoveryNotification";
// api, utils, styles, ...
import { loadLocations } from "./api";
import { extractCountriesFromLocations } from "./utils";
import styles from "./App.module.scss";

export default function App() {
  const { data, error, isPending } = useAsync({ promiseFn: loadLocations });
  const [selectedCountry, setSelectedCountry] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1080);

  const handleSelectedCountry = country => {
    setSelectedCountry(country);
    // in small devices close sidebar after country selection
    if(window.innerWidth < 480) {
      setSidebarOpen(false);
    }
  };

  if (isPending) return <AppLoading />;
  if (error) return <AppLoadingError />;
  if (data) {
    const { latest, locations = [] } = data;

    return (
      <div className={`${styles.app} ${ sidebarOpen ? styles.sideOpen : styles.sideClose }`}>
        <div className={styles.side}>
          <Sidebar
            open={sidebarOpen}
            onToggleButtonClick={() => setSidebarOpen(!sidebarOpen)}
            countries={extractCountriesFromLocations(locations)}
            onSelectedCountryChanged={handleSelectedCountry}
          />
        </div>
        <div className={styles.main}>
          <MainContent selectedCountry={selectedCountry} />
          <RecoveryNotification open={!latest.recovered} />
        </div>
      </div>
    );
  }

  return null;
}