import React, { useContext } from "react";
import dayjs from "dayjs";
import { Item, Tag } from "context/model";
import ItemContext from "context/items/itemContext";

interface ItemTableItemProps {
  item: Item;
}

const ItemTableItem = ({
  item: { _id, name, platform, dateAdded, tags }
}: ItemTableItemProps) => {
  const { deleteItem } = useContext(ItemContext);
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
      <td>
        <div className="row">
          <div className="col s1 right">
            <button className="btn" onClick={() => deleteItem(_id)}>
              <i className="material-icons">delete</i>
            </button>
          </div>
          {/* <div className="col s1 right">
                    <a
                      href="#edit-tag-modal"
                      className="btn modal-trigger"
                      onClick={() => setEditedTag(tag)}
                    >
                      <i className="material-icons">build</i>
                    </a>
                  </div> */}
        </div>
      </td>
    </tr>
  );
};

export default ItemTableItem;
