import React from "react";
import dayjs from "dayjs";
import { Item, Skill } from "context/items/model";

interface ItemTableItemProps {
  item: Item;
}

const ItemTableItem = ({
  item: { _id, name, email, phone, company, department, dateAdded, skills }
}: ItemTableItemProps) => {
  return (
    <tr key={_id}>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>{company}</td>
      <td>{department}</td>
      <td>{dayjs(dateAdded).format("MM/DD/YYYY")}</td>
      <td>
        {skills &&
          skills.map((skill: Skill) => (
            <span key={skill._id} style={{ display: "block" }}>
              {skill.name}
            </span>
          ))}
      </td>
    </tr>
  );
};

export default ItemTableItem;
