import { FaRegUser } from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import styles from "./Contact.module.css";

export default function Contact({ id, name, number, deleteContact }) {
    return (
      <>
        <div className={styles.contactCardWrapper}>
          <div className={styles.iconCardWrapper}>
              <FaRegUser className={styles.iconReUser}/>
              <p className={styles.name}>
              {name}
              </p>
          </div>
          <div className={styles.iconCardWrapper}>
              <MdPhoneIphone className={styles.iconIphone}/>
              <p className={styles.number}>
              {number}
              </p>
          </div>
        </div>
  
        <button className={styles.deleteButton} onClick={() => deleteContact(id)}>
          Delete
        </button>
      </>
    );
  };