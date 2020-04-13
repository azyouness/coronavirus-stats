import React from "react";
import { FaGithub } from "react-icons/fa";
// components
import World from "./../WorldContainer";
import Country from "./../CountryContainer";
//
import styles from "./MainContent.module.scss";


export default ({ selectedCountry }) => {
  return (
    <main className={styles.mainContent}>
      {  typeof selectedCountry.code === "undefined"
        ? <World />
        : <Country key={selectedCountry.code} country={selectedCountry} /> }
        
      <GithubButton />
    </main>
  );
};

const GithubButton = () => (
  <a
    className={styles.githubButton}
    href="https://github.com/azyouness/coronavirus-stats"
    target="_blank"
    rel="noreferrer noopener"
  >
    <FaGithub />
  </a>
);