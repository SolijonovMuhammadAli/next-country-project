import styles from "./countries.module.css";
import down from "./icons8-down-24.png";
import Image from "next/image";
import Link from "next/Link";
import { useState } from "react";

const orderBy = (countries, direction, value) => {
  if (direction === "asc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }
  if (direction === "desc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }
  return countries;
};

const SortArrow = ({ direction }) => {
  if (!direction) {
    return <></>;
  }

  if (direction === "desc") {
    return <Image src={down} alt="..." height={10} width={10} />;
  } else {
    return (
      <Image
        className={styles.upImage}
        src={down}
        alt="..."
        height={10}
        width={10}
      />
    );
  }
};

function CountriesTable({ countries }) {
  const [direction, setDirection] = useState();
  const [value, setValue] = useState();

  const orderedCountries = orderBy(countries, direction, value);

  const SwitchDirection = () => {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection(null);
    }
  };

  const setValueDirection = (value) => {
    SwitchDirection();
    setValue(value);
  };

  return (
    <div>
      <div className={styles.heading}>
        <div className={styles.flag_heading}></div>
        <button
          className={styles.heading_name}
          onClick={() => setValueDirection("name")}
        >
          <div>Name</div>
          {value === "name" && <SortArrow direction={direction} />}
        </button>
        <button
          className={styles.heading_population}
          onClick={() => setValueDirection("population")}
        >
          <div>Population</div>
          {value === "population" && <SortArrow direction={direction} />}
        </button>
        <button
          className={styles.heading_area}
          onClick={() => setValueDirection("area")}
        >
          <div>
            Area (km<sup style={{ fontSize: "0.5rem" }}>2</sup>)
          </div>
          {value === "area" && <SortArrow direction={direction} />}
        </button>
        <button
          className={styles.heading_gini}
          onClick={() => setValueDirection("gini")}
        >
          <div>Gini</div>
          {value === "gini" && <SortArrow direction={direction} />}
        </button>
      </div>

      {orderedCountries.map((item) => (
        <Link key={item.alpha3Code} href={`/country/${item.alpha3Code}`}>
          <div className={styles.row}>
            <div className={styles.flag}>
              <img src={item.flag} alt="Flag" />
            </div>
            <div className={styles.name}>{item.name}</div>
            <div className={styles.population}>{item.population}</div>
            <div className={styles.area}>{item.area || 0}</div>
            <div className={styles.gini}>{item.gini || 0} %</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default CountriesTable;
