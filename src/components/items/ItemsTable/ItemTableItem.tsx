import React from "react";
import dayjs from "dayjs";
import { Item, Tag } from "context/items/model";

interface ItemTableItemProps {
  item: Item;
}

const ItemTableItem = ({
  item: { _id, name, platform, dateAdded, tags }
}: ItemTableItemProps) => {
  return (
    <tr key={_id}>
      <td>{name}</td>
      <td>{platform}</td>
      <td>{dayjs(dateAdded).format("MM/DD/YYYY")}</td>
      <td>
        {tags &&
          tags.map((tag: Tag) => (
            <span key={tag._id} style={{ display: "block" }}>
              {tag.name}
            </span>
          ))}
      </td>
    </tr>
  );
};

export default ItemTableItem;
