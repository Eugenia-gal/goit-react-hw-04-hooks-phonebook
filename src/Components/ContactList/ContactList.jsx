import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/macro';
import CustomContactList from './ContactList.styled';

const ListContactEl = styled.li`
  display: flex;
  justify-content: space-between;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

function ContactList({ contacts, onDeleteContact }) {
  return (
    <CustomContactList>
      {contacts.map(contact => (
        <ListContactEl key={contact.id}>
          <span>
            {contact.name}: {contact.number}
          </span>
          <button type="button" onClick={() => onDeleteContact(contact.id)}>
            Delete
          </button>
        </ListContactEl>
      ))}
    </CustomContactList>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
