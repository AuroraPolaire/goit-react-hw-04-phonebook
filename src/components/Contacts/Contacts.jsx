import { Table } from './Contacts.styled';
import PropTypes from 'prop-types';

export const Contacts = ({ contactList, deleteContact }) => {
  return (
    <Table>
      <tbody>
        {contactList.map(contact => {
          return (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.number}</td>
              <td>
                <button onClick={() => deleteContact(contact.id)}>
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

Contacts.propTypes = {
  contactList: PropTypes.arrayOf(
    PropTypes.shape({
      contact: PropTypes.object,
    })
  ),
  deleteContact: PropTypes.func.isRequired,
};
