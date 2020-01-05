import React, { useContext } from "react";
import contactContext from "context/contacts/contactContext";
import ContactsTable from "components/contacts/ContactsTable";

const Contacts = () => {
  const { contacts } = useContext(contactContext);

  return <ContactsTable contacts={contacts} />;
};

export default Contacts;
