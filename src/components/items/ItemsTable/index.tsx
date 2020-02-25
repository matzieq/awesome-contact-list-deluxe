import React, { useState } from "react";
import TableHeader from "./TableHeader";
import ItemTableItem from "./ItemTableItem";
import { Item } from "context/model";
import DisplayItemModal from "./DisplayItemModal";

interface ContacsTableProps {
  items: Item[];
}

const ItemsTable = ({ items }: ContacsTableProps) => {
  const [filter, setFilter] = useState("");
  const [sortMethod, setSortMethod] = useState<
    ((a: Item, b: Item) => number) | null
  >(null);
  const [tappedItem, setTappedItem] = useState<Item | null>(null);

  const handleChange = (e: any) => {
    setFilter(e.target.value);
  };

  const filteredItems =
    items &&
    items.filter(
      item =>
        item.name.toLowerCase().includes(filter.toLowerCase()) ||
        item.platform.name.toLowerCase().includes(filter.toLowerCase()) ||
        item.dateAdded
          .toString()
          .toLowerCase()
          .includes(filter.toLowerCase()) ||
        item.tags.find(tag =>
          tag.name.toLowerCase().includes(filter.toLowerCase())
        )
    );

  const sortedItems = sortMethod
    ? filteredItems.sort(sortMethod)
    : filteredItems;

  console.log(tappedItem);
  return (
    <>
      <div className="row section">
        <div className="input-field col s12">
          <input
            type="text"
            name="filter"
            onChange={handleChange}
            className=""
            value={filter}
          />
          <label htmlFor="filter">Filter items</label>
        </div>
        <div className="divider"></div>
        <div className="col s12">
          <table>
            <TableHeader setSortMethod={setSortMethod} />
            <tbody>
              {sortedItems &&
                sortedItems.map((item: Item) => (
                  <ItemTableItem
                    key={item._id}
                    item={item}
                    setTappedItem={setTappedItem}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col s12">
          <a href="#add-item-modal" className="btn black modal-trigger right">
            new<i className="material-icons right">add</i>
          </a>
        </div>
      </div>
      <DisplayItemModal item={tappedItem} setTappedItem={setTappedItem} />
    </>
  );
};

export default ItemsTable;
