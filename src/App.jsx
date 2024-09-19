import { useEffect, useState } from "react";
import ContactForm from "components/ContactForm/ContactForm";
import SearchBox from "components/SearchBox/SearchBox";
import ContactList from "components/ContactList/ContactList";
import initialContacts from './db/contacts.json';
import { FaAddressBook } from "react-icons/fa";
import { FaChess } from "react-icons/fa";
import "./App.css";

export default function App() {
  const [contacts, setContacts] = useState(() => {
    const savedContact = JSON.parse(window.localStorage.getItem("saved-contacts"));
    return savedContact !== null ? savedContact : initialContacts;
  });

  const [filterByName, setFilterByName] = useState("");
  const [filterByNumber, setFilterByNumber] = useState("");
  const [deletedContact, setDeletedContact] = useState(null);
  const [deletedContactIndex, setDeletedContactIndex] = useState(null);

  useEffect(() => {
    window.localStorage.setItem("saved-contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (newContact) => {
    setContacts((prevContacts) => [newContact, ...prevContacts]);
  };

  const deleteContact = (contactId) => {
    setContacts((prevContacts) => {
      const indexToDelete = prevContacts.findIndex(contact => contact.id === contactId);
      const contactToDelete = prevContacts[indexToDelete];
      setDeletedContact(contactToDelete);
      setDeletedContactIndex(indexToDelete);
      return prevContacts.filter((contact) => contact.id !== contactId);
    });
  };

  const undoDelete = () => {
    if (deletedContact) {
      setContacts(prevContacts => {
        const newContacts = [...prevContacts];
        newContacts.splice(deletedContactIndex, 0, deletedContact);
        return newContacts;
      });
      setDeletedContact(null);
      setDeletedContactIndex(null);
    }
  };

  const filteredContacts = contacts.filter(contact => {
    if (filterByName) {
      return contact.name.toLowerCase().includes(filterByName.toLowerCase());
    }
    if (filterByNumber) {
      return contact.number.includes(filterByNumber);
    }
    return true;
  });

  const noContacts = contacts.length === 0;

  return (
    <div className="cardBox">
      <FaAddressBook className="iconBook" />
      <h1 className="mainTitle">Phonebook</h1>
      <ContactForm addContact={addContact} />
      <SearchBox
        filterByName={filterByName}
        setFilterByName={setFilterByName}
        filterByNumber={filterByNumber}
        setFilterByNumber={setFilterByNumber}
      />
      <div className="boxShadow">
        <div className="subtitleWrapper">
          <h2 className="preTitle">Contacts</h2>
          {!noContacts && deletedContact && (
            <button className="undoButton" onClick={undoDelete}>
              Undo
            </button>
          )}
        </div>
        {noContacts ? (
          <div className="messageWrapper">
            <div className="messageContentWrapper">
              <FaChess className="messageIconInfo" size="16"/>
              <p className="messageInfo">
                Not contacts are available at the moment. 
                <br/> 
                Please, add some contacts to view them here.
              </p>
            </div>
          </div>
        ) : (
          <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
        )}
      </div>
    </div>
  );
};
