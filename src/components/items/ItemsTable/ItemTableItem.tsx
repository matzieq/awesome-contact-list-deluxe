import React, { useContext } from "react";
import dayjs from "dayjs";
import { Item, Tag } from "context/model";
import ItemContext from "context/items/itemContext";

interface ItemTableItemProps {
  item: Item;
  setTappedItem: any;
}

const ItemTableItem = ({
  item,
  setTappedItem,
  item: { _id, name, platform, dateAdded, tags }
}: ItemTableItemProps) => {
  const { deleteItem, setCurrent } = useContext(ItemContext);
  console.log(platform);
  return (
    <tr key={_id} onClick={() => setTappedItem(item)}>
      <td>{name}</td>
      <td className="hide-on-med-and-up">
        <i className="material-icons right">info</i>
      </td>
      <td className="hide-on-med-and-down">{platform.name}</td>
      <td className="hide-on-med-and-down">
        {dayjs(dateAdded).format("MM/DD/YYYY")}
      </td>
      <td className="hide-on-med-and-down">
        {tags &&
          tags.map((tag: Tag) => (
            <span key={tag._id} style={{ display: "block" }}>
              {tag.name}
            </span>
          ))}
      </td>
      <td className="hide-on-med-and-down">
        <div className="row">
          <div className="col s6 right">
            <button className="btn right black" onClick={() => deleteItem(_id)}>
              <i className="material-icons">delete</i>
            </button>
          </div>
          <div className="col s6 right">
            <a
              href="#edit-item-modal"
              className="btn black modal-trigger right"
              onClick={() => setCurrent(item)}
            >
              <i className="material-icons">build</i>
            </a>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default ItemTableItem;
