import React from "react";
import dayjs from "dayjs";
import { Contact, Skill } from "context/contacts/model";

interface ContactTableItemProps {
  contact: Contact;
}

const ContactTableItem = ({
  contact: { _id, name, email, phone, company, department, dateAdded, skills }
}: ContactTableItemProps) => {
  return (
    <tr key={_id}>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>{company}</td>
      <td>{department}</td>
      <td>{dayjs(dateAdded).format("MM/DD/YYYY")}</td>
      <td>
        {skills.map((skill: Skill) => (
          <span style={{ display: "block" }}>{skill.name}</span>
        ))}
      </td>
    </tr>
  );
};

export default ContactTableItem;
