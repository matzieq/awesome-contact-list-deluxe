import React, { useContext } from "react";
import contactContext from "context/contacts/contactContext";
import { Skill } from "context/contacts/model";

const Skills = () => {
  const { skills } = useContext(contactContext);
  return (
    <table>
      <tr>
        <th>Skills</th>
      </tr>
      {skills.map((skill: Skill) => (
        <tr key={skill._id}>
          <td>{skill.name}</td>
        </tr>
      ))}
    </table>
  );
};

export default Skills;
