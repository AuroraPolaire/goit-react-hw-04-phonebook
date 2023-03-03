import { useState } from 'react';
import { FormStyled } from '../Filter/Form.styled';
import PropTypes from 'prop-types';

export const Form = ({onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('')


  const handleChange = e => {

    const { name, value } = e.target;

    switch (name){
      case 'name' :
        return setName(value);
      case 'number' :
        return setNumber(value);
        default:
          return;

    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({name, number});
    resetForm();
  };

 const resetForm = () => {
    setName('');
    setNumber('')
    
  };

  return (
      <div>
        <FormStyled onSubmit={handleSubmit}>
          <label>
            Name
            <input
              className="name"
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={name}
              onChange={handleChange}
            />
          </label>
          <label>
            Number
            <input
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={number}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Add contact</button>
        </FormStyled>
      </div>
    );
  }

Form.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
};
