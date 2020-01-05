import React, { useReducer } from "react";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import { Contact, State } from "context/contacts/model";

import {
  // GET_CONTACTS,
  CLEAR_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
  // CONTACT_ERROR
} from "../types";

const ContactState = (props: any) => {
  const initialState: State = {
    contacts: [
      {
        _id: 1,
        name: "Witek Prytek",
        email: "mietek@pletwa.com",
        phone: "66666",
        company: "Pletwa",
        department: "Pletwa",
        dateAdded: new Date(),
        skills: [
          { _id: 1, name: "Wałęsanie się" },
          { _id: 2, name: "Kłapanie" }
        ]
      },
      {
        _id: 2,
        name: "Janek Dzbanek",
        email: "janek@pletwa.com",
        phone: "666667777",
        company: "Pletwa",
        department: "Pletwa",
        dateAdded: new Date(),
        skills: [
          { _id: 1, name: "Wałęsanie się" },
          { _id: 3, name: "Grzybobranie" }
        ]
      },
      {
        _id: 3,
        name: "Józek Wózek",
        email: "juzek@pletwa.com",
        phone: "66666777788",
        company: "Pletwa",
        department: "Pletwa",
        dateAdded: new Date(),
        skills: [
          { _id: 2, name: "Kłapanie" },
          { _id: 3, name: "Grzybobranie" }
        ]
      }
    ],
    current: null,
    filtered: null,
    error: null,
    loading: true,
    skills: [
      { _id: 1, name: "Wałęsanie się" },
      { _id: 2, name: "Kłapanie" },
      { _id: 3, name: "Grzybobranie" }
    ]
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Get contacts
  // const getContacts = async () => {

  //     dispatch({ type: GET_CONTACTS, payload: res.data });

  // };

  // Add contact
  const addContact = (contact: Contact) => {
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  // Delete contact
  const deleteContact = (id: number) => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  // Clear contacts
  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  // Set current contact
  const setCurrent = (contact: Contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  // Clear current contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Update contact
  const updateContact = (contact: Contact) => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  // Filter contacts
  const filterContacts = (filter: string) => {
    dispatch({ type: FILTER_CONTACTS, payload: filter });
  };

  // Clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  const { contacts, current, filtered, error, loading, skills } = state;

  return (
    <ContactContext.Provider
      value={{
        contacts,
        current,
        filtered,
        error,
        loading,
        skills,

        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        clearContacts
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
