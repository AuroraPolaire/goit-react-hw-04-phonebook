import { Component } from 'react';
import { Section } from './Section/Section';
import { Form } from './Form/Form';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione', number: '443-89-12' },
      { id: 'id-3', name: 'Eden', number: '645-17-79' },
      { id: 'id-4', name: 'Annie', number: '227-91-26' },
    ],
    filter: '',
  };

  static result = 'false';

  updateContacts = ({ name, number }) => {
    this.result = 'false';
    this.state.contacts.forEach(contact => {
      console.log(contact.name.includes(name));
      if (contact.name === name && contact.number === number) {
        this.result = 'true';
        return;
      }
    });

    this.result === 'true'
      ? Notify.warning(
          `Contact with name : ${name} and number : ${number} already exists`
        )
      : this.setState(prevState => ({
          contacts: [
            ...prevState.contacts,
            {
              name,
              number,
              id: nanoid(),
            },
          ],
        }));
  };

  filterContacts = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  deleteContacts = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { filter } = this.state;

    const normalizedFilter = this.state.filter.toLowerCase();
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return (
      <>
        <Section title="Phonebook">
          <Form onSubmit={this.updateContacts} />
        </Section>
        <Section title="Contacts">
          <Filter value={filter} filter={this.filterContacts} />
          <Contacts
            contactList={filteredContacts}
            deleteContact={this.deleteContacts}
          />
        </Section>
      </>
    );
  }
}
