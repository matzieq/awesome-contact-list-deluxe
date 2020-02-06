import React, { useContext } from "react";
import itemContext from "context/items/itemContext";
import { Skill } from "context/items/model";

const Skills = () => {
  const { tags } = useContext(itemContext);
  return (
    <table>
      <thead>
        <tr>
          <th>Tags</th>
        </tr>
      </thead>
      <tbody>
        {tags &&
          tags.map((tag: Skill) => (
            <tr key={tag._id}>
              <td>{tag.name}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Skills;
