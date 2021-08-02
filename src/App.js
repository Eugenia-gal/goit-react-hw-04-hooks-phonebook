import { useState, useEffect } from 'react';
import './App.css';
import Container from 'Components/Container';
import Form from 'Components/Form';
import shortid from 'shortid';
import ContactList from 'Components/ContactList';
import Filter from 'Components/Filter';
// import initialContacts from 'Data/contacts.json';

const useLocalStorage = (key, initialValue) => {
  const [state, setState] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key)) ?? initialValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
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
