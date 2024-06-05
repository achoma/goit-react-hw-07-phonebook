import { useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import ContactsList from './ContactList/ContactsList';
import css from './App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, addContact, deleteContact } from '../redux/operations';
import {
  getContacts,
  getFilter,
  getIsLoading,
  getError,
} from '../redux/selectors';
import { setFilter } from '../redux/contactsSlice';

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleFilterChange = event => {
    dispatch(setFilter(event.target.value));
  };

  const handleAddContact = (name, phone) => {
    dispatch(addContact({ name, phone }));
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  return (
    <div className={css.container}>
      <h1 className={css.heading}>Phonebook</h1>
      <ContactForm onSubmit={handleAddContact} />
      <Filter filter={filter} onFilterChange={handleFilterChange} />
      <h2 className={css.heading}>Contacts</h2>
      {isLoading && !error && <b>Request in progress...</b>}
      {error && <p className={css.error}>{error}</p>}
      <ContactsList
        contacts={contacts}
        filter={filter}
        onDelete={handleDeleteContact}
      />
    </div>
  );
};
