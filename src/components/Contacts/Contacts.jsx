import { Table } from './Contacts.styled';

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
