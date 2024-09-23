import { useId } from "react";
import { FaSistrix } from 'react-icons/fa';
import styles from "./SearchBox.module.css";

export default function SearchBox({ filterByName, setFilterByName, filterByNumber, setFilterByNumber }) {
  const nameSearchId = useId();
  const numberSearchId = useId();

  const handleNameSearch = (event) => {
    setFilterByName(event.target.value);
    setFilterByNumber(""); 
  };

  const handleNumberSearch = (event) => {
    setFilterByNumber(event.target.value);
    setFilterByName(""); 
  };

  return (
    <div className={styles.searchWrapper}>
      <label htmlFor={nameSearchId}>
        <div className={styles.inputContainer}>
          <input
            id={nameSearchId}
            type="search"
            name="searchName"
            placeholder="Search by name"
            value={filterByName}
            onChange={handleNameSearch}
          />
          <FaSistrix className={styles.iconSearch} />
        </div>
        Find contacts by name
      </label>
      
      <label htmlFor={numberSearchId}>
        <div className={styles.inputContainer}>
          <input
            id={numberSearchId}
            type="search"
            name="searchNumber"
            placeholder="Search by number"
            value={filterByNumber}
            onChange={handleNumberSearch}
          />
          <FaSistrix className={styles.iconSearch} />
        </div>
        Find contacts by number
      </label>
    </div>
  );
};