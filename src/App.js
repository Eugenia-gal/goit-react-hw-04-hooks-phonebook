import React, { Component } from 'react';
import './App.css';
import Container from 'Components/Container';
import Form from 'Components/Form';
import shortid from 'shortid';
import ContactList from 'Components/ContactList';
import Filter from 'Components/Filter';
// import initialContacts from 'Data/contacts.json';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = data => {
    const { contacts } = this.state;
    const newContact = { id: shortid.generate(), ...data };
    const contactNames = contacts.map(contact => contact.name);
    const isRepeat = contactNames.indexOf(data.name) !== -1;

    if (isRepeat) {
      alert(`${data.name} is already in Contacts`);
      return;
    }

    this.setState(oldState => ({
      contacts: [newContact, ...oldState.contacts],
    }));
  };

  deleteContact = id => {
    this.setState(oldState => ({
      contacts: oldState.contacts.filter(contact => contact.id !== id),
    }));
  };

  filterContacts = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(oldProps, oldState) {
    if (this.state.contacts !== oldState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const normalizedFilter = this.state.filter.toLowerCase();
    const visibleContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );

    return (
      <Container>
        <h1>Phonebook</h1>
        <Form onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.filterContacts} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </Container>
    );
  }
}

export default App;
