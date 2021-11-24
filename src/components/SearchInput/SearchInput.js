import styles from "./searchInput.module.css";
import search from "./icons8-search-50.png";
import Image from "next/image";

export default function SearchInput({ ...rest }) {
  return (
    <div className={styles.wrapper}>
      <Image src={search} alt="do not Image" width={20} height={20} />
      <input className={styles.input} {...rest} />
    </div>
  );
}
