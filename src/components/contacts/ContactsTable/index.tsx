import React from "react";
import TableHeader from "./TableHeader";
import ContactTableItem from "./ContactTableItem";
import { Contact } from "context/contacts/model";

interface ContacsTableProps {
  contacts: Contact[];
}

const ContactsTable = ({ contacts }: ContacsTableProps) => {
  return (
    <table>
      <TableHeader />
      {contacts.map((contact: Contact) => (
        <ContactTableItem contact={contact} />
      ))}
    </table>
  );
};

export default ContactsTable;
