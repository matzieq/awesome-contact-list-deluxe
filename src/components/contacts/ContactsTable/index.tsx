import React, { useState } from "react";
import TableHeader from "./TableHeader";
import ContactTableItem from "./ContactTableItem";
import { Contact } from "context/contacts/model";

interface ContacsTableProps {
  contacts: Contact[];
}

const ContactsTable = ({ contacts }: ContacsTableProps) => {
  const [filter, setFilter] = useState("");
  const [sortMethod, setSortMethod] = useState<
    ((a: Contact, b: Contact) => number) | null
  >(null);
  const handleChange = (e: any) => {
    setFilter(e.target.value);
  };

  const filteredContacts = contacts.filter(
    contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()) ||
      contact.email.toLowerCase().includes(filter.toLowerCase()) ||
      contact.phone.toLowerCase().includes(filter.toLowerCase()) ||
      contact.company.toLowerCase().includes(filter.toLowerCase()) ||
      contact.department.toLowerCase().includes(filter.toLowerCase()) ||
      contact.dateAdded
        .toString()
        .toLowerCase()
        .includes(filter.toLowerCase()) ||
      contact.skills.find(skill =>
        skill.name.toLowerCase().includes(filter.toLowerCase())
      )
  );

  const sortedContacts = sortMethod
    ? filteredContacts.sort(sortMethod)
    : filteredContacts;

  return (
    <div className="row section">
      <div className="input-field col s12">
        <input
          type="text"
          name="filter"
          onChange={handleChange}
          className=""
          value={filter}
        />
        <label htmlFor="filter">Filter contacts</label>
      </div>
      <div className="divider"></div>
      <div className="col s12">
        <table>
          <TableHeader setSortMethod={setSortMethod} />
          <tbody>
            {sortedContacts.map((contact: Contact) => (
              <ContactTableItem key={contact._id} contact={contact} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactsTable;
