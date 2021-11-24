import CountriesTable from "../components/CountriesTable/CountriesTable";
import Layout from "../components/Layout/Layout";
import SearchInput from "../components/SearchInput/SearchInput";
import { useState } from "react";
import styles from "./../styles/Home.module.css";

export default function Home({ countries }) {
  const [keyword, setKeyword] = useState("");
  const filterCountries = countries.filter(
    (item) =>
      item.name.toLowerCase().includes(keyword) ||
      item.region.toLowerCase().includes(keyword) ||
      item.subregion.toLowerCase().includes(keyword)
  );
  const onInputChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <Layout>
      <div className={styles.inputContainer}>
        <div className={styles.counts}>Found {countries.length} countries</div>
        <div className={styles.input}>
          <SearchInput
            placeholder="Filter by name, Region or SubRegion"
            onChange={onInputChange}
          />
        </div>
      </div>
      <CountriesTable countries={filterCountries} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.com/v2/all");
  const countries = await res.json();
  return {
    props: {
      countries,
    },
  };
};
