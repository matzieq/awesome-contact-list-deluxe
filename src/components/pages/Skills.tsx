import React, { useContext } from "react";
import contactContext from "context/contacts/contactContext";
import { Skill } from "context/contacts/model";

const Skills = () => {
  const { skills } = useContext(contactContext);
  return (
    <table>
      <thead>
        <tr>
          <th>Skills</th>
        </tr>
      </thead>
      <tbody>
        {skills &&
          skills.map((skill: Skill) => (
            <tr key={skill._id}>
              <td>{skill.name}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Skills;
