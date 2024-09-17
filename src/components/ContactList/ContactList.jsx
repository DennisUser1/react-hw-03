import Contact from "../Contact/Contact";
import styles from "./ContactList.module.css";

export default function ContactList({ contacts, deleteContact }) {
    return (
      <>
        <ul className={styles.contactsList}>
          {contacts.map((contact) => {
            return (
              <li className={styles.contactItem} key={contact.id}>
                <Contact
                  id={contact.id}
                  name={contact.name}
                  number={contact.number}
                  deleteContact={deleteContact}
                />
              </li>
            );
          })}
        </ul>
      </>
    );
  };