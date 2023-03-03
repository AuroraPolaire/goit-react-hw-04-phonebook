import { useState, useEffect } from 'react';
import { Section } from './Section/Section';
import { Form } from './Form/Form';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';
import { Report } from 'notiflix/build/notiflix-report-aio';
import PropTypes from 'prop-types';

export const App = () => {
const [contacts, setContacts] = useState(() => JSON.parse(window.localStorage.getItem('contacts')) ?? []);
const [filter, setFilter] = useState('');

useEffect(() => {
  window.localStorage.setItem('contacts', JSON.stringify(contacts))
},[contacts])


  const updateContacts = ({ name, number }) => {
    const contactExists = contacts.find(contact => {
      return contact.name === name || contact.number === number;
    });

    contactExists
      ? Report.info(
          '',
          `Contact with name ${name} and number ${number} already exists`,
          'Okay'
        )
      : setContacts(prevContacts => ([...prevContacts, {id: nanoid(), name, number}]))
      
      
  };

  const filterContacts = e => {
    setFilter(e.target.value);
  };

  const deleteContacts = id => {
    setContacts(prevContacts => (prevContacts.filter(contact => contact.id !== id))
  )};
     
  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  return (
      <>
        <Section title="Phonebook">
          <Form onSubmit={updateContacts} />
        </Section>
        <Section title="Contacts">
          <Filter value={filter} filter={filterContacts} />
          <Contacts
            contactList={filteredContacts}
            deleteContact={deleteContacts}
          />
        </Section>
      </>
    );
  }
  


App.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
  id: PropTypes.string,
};
