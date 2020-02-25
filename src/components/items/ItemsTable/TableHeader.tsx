import React, { Dispatch, SetStateAction, useState } from "react";
import { Item } from "context/model";

interface TableHeaderProps {
  setSortMethod: Dispatch<
    SetStateAction<((a: Item, b: Item) => number) | null>
  >;
}

const TableHeader: React.FC<TableHeaderProps> = ({ setSortMethod }) => {
  const [isSortingAscending, setIsSortingAscending] = useState(true);
  const [sortKey, setSortKey] = useState<keyof Item>("name");

  const sortAscending = (a: any, b: any) => {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  };

  const sortDescending = (a: any, b: any) => {
    if (a > b) {
      return -1;
    }
    if (a < b) {
      return 1;
    }
    return 0;
  };

  const setSortProperty = (key: keyof Item) => {
    if (key === sortKey) {
      setIsSortingAscending(!isSortingAscending);
    } else {
      setIsSortingAscending(true);
      setSortKey(key);
    }

    setSortMethod(() => (a: Item, b: Item) =>
      isSortingAscending
        ? sortAscending(a[key], b[key])
        : sortDescending(a[key], b[key])
    );
  };

  return (
    <thead>
      <tr>
        <th onClick={() => setSortProperty("name")}>
          <span className="hide-on-med-and-down">Title</span>
          <span className="hide-on-med-and-up">Game list</span>
        </th>
        <th
          onClick={() => setSortProperty("platform")}
          className="hide-on-med-and-down"
        >
          Platform
        </th>
        <th
          onClick={() => setSortProperty("dateAdded")}
          className="hide-on-med-and-down"
        >
          Date Added
        </th>
        <th className="hide-on-med-and-down">Tags</th>
        <th className="right hide-on-med-and-down">Actions</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
