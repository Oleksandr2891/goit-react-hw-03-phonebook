import { Component } from 'react';
import ContactList from './Componenets/ContactList/ContactList';
import FIlter from './Componenets/Filter/FIlter';
import Form from './Componenets/Form/Form';
import Section from './Componenets/Section/Section';
import { contacts } from './contacts.json';
import GlobalStyles from "../src/style/GlobalStyle";


class App extends Component {
  state = {
    contacts,
    filter: ''

  };

  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'))
    this.setState({ contacts: parsedContacts })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }

  onDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId)
    }));
  };

  handleSubmit = data => {
    this.setState(prevState => {
      const findName = prevState.contacts.find(item => item.name === data.name);
      if (!findName) {
        return { contacts: [data, ...prevState.contacts] }
      } else {
        return alert(`${data.name} is already in contacts`)
      }
    }
    );
  };

  onChangeFilter = event => {
    this.setState({ filter: event.currentTarget.value })
  };


  getVisibleContacs = () => {
    const { filter, contacts } = this.state
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter))
  };


  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacs();

    return (
      <>
        <GlobalStyles />
        <Section title={'Phonebook'}>
          <Form onSubmit={this.handleSubmit} />
        </Section>
        <Section title={'Contacts'}>
          <div className="contactsWrapper">
            <FIlter filter={filter} onChange={this.onChangeFilter} />
            <ContactList contacts={visibleContacts} onDeleteContact={this.onDeleteContact} />
          </div>
        </Section>
      </>
    );
  }
}

export default App
