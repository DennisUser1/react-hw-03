import { FaSistrix } from 'react-icons/fa';
import styles from "./SearchBox.module.css";

export default function SearchBox({ filterContacts, setFilterContacts }) {
  const handleSearch = (event) => {
    setFilterContacts(event.target.value);
  };
  return (
    <div className={styles.searchWrapper}>
      <label>
        <div className={styles.inputContainer}>
          <input 
            type="search" 
            name="search"
            placeholder="Search contacts"
            value={filterContacts} 
            onChange={handleSearch}/>
          <FaSistrix className={styles.iconSearch} />
        </div>
        Find contacts by name
      </label>
    </div>
  );
};