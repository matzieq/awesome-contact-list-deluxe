import React, { useContext } from "react";
import itemContext from "context/items/itemContext";
import ItemsTable from "components/items/ItemsTable";

const Items = () => {
  const { items } = useContext(itemContext);

  return <ItemsTable items={items} />;
};

export default Items;
