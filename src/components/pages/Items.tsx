import React, { useContext, useEffect } from "react";
import itemContext from "context/items/itemContext";
import ItemsTable from "components/items/ItemsTable";

const Items = () => {
  const { items, getItems, getTags } = useContext(itemContext);

  useEffect(() => {
    getItems();
    getTags();

    // eslint-disable-next-line
  }, []);

  return <ItemsTable items={items} />;
};

export default Items;
