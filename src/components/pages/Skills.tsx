import React, { useContext } from "react";
import contactContext from "context/contacts/contactContext";

const Skills = () => {
  const { skills } = useContext(contactContext);
  return (
    <table>
      <tr>
        <th>Skills</th>
      </tr>
      {skills.map((skill: any) => (
        <tr key={skill._id}>
          <td>{skill.name}</td>
        </tr>
      ))}
    </table>
  );
};

export default Skills;
