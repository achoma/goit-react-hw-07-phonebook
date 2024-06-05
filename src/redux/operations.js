import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://6660c4755425580055b529b1.mockapi.io'; //6660c4755425580055b529b1.mockapi.io/contacts/:endpoint

//https:
export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, phone }, thunkAPI) => {
    const state = thunkAPI.getState();
    const existingContact = state.contacts.contacts.find(
      contact => contact.name.toLowerCase() === name.trim().toLowerCase()
    );
    if (existingContact) {
      return thunkAPI.rejectWithValue(`${name} is already in contacts!`);
    }
    try {
      const response = await axios.post('/contacts', {
        name,
        phone,
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
