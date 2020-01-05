import React, { useContext } from "react";
import contactContext from "context/contacts/contactContext";
import dayjs from "dayjs";

const Contacts = () => {
  const { contacts } = useContext(contactContext);

  return (
    <table>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Company</th>
        <th>Department</th>
        <th>Date Added</th>
        <th>Skills</th>
      </tr>
      {contacts.map((contact: any) => {
        const {
          _id,
          name,
          email,
          phone,
          company,
          department,
          dateAdded,
          skills
        } = contact;
        return (
          <tr key={_id}>
            <td>{name}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>{company}</td>
            <td>{department}</td>
            <td>{dayjs(dateAdded).format("MM/DD/YYYY")}</td>
            <td>
              {skills.map((skill: any) => (
                <span style={{ display: "block" }}>{skill.name}</span>
              ))}
            </td>
          </tr>
        );
      })}
    </table>
  );
};

export default Contacts;
