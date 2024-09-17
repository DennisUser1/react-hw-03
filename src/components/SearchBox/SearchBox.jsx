import styles from "./SearchBox.module.css";

export default function SearchBox({ filterContacts, setFilterContacts }) {
  const handleSearch = (event) => {
    setFilterContacts(event.target.value);
  };
  return (
    <div className={styles.searchWrapper}>
      <label>
        <input 
        type="search" 
        name="search"
        placeholder="Search contacts"
        value={filterContacts} 
        onChange={handleSearch}/>
        Find contacts by name
      </label>
    </div>
  );
};