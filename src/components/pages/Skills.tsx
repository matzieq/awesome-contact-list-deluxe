import React, { useContext } from "react";
import itemContext from "context/items/itemContext";
import { Skill } from "context/items/model";

const Skills = () => {
  const { skills } = useContext(itemContext);
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
