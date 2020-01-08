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
      <tbody>
        {contacts.map((contact: Contact) => (
          <ContactTableItem key={contact._id} contact={contact} />
        ))}
      </tbody>
    </table>
  );
};

export default ContactsTable;
