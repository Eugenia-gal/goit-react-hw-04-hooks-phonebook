import { useState, useEffect } from 'react';
import './App.css';
import Container from 'Components/Container';
import Form from 'Components/Form';
import shortid from 'shortid';
import ContactList from 'Components/ContactList';
import Filter from 'Components/Filter';
// import initialContacts from 'Data/contacts.json';

function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const addContact = data => {
    const newContact = { id: shortid.generate(), ...data };
    const contactNames = contacts.map(contact => contact.name);
    const isRepeat = contactNames.indexOf(data.name) !== -1;

    if (isRepeat) {
      alert(`${data.name} is already in Contacts`);
      return;
    }

    setContacts(prevState => [newContact, ...prevState]);
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const filterContacts = e => {
    const { value } = e.target;
    setFilter(value);
  };

  useEffect(() => {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const visibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <Form onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={filterContacts} />
      <ContactList
        contacts={visibleContacts()}
        onDeleteContact={deleteContact}
      />
    </Container>
  );
}

export default App;
