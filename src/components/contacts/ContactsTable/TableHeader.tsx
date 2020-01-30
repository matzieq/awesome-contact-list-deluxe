import React, { Dispatch, SetStateAction, useState } from "react";
import { Contact } from "context/contacts/model";

interface TableHeaderProps {
  setSortMethod: Dispatch<
    SetStateAction<((a: Contact, b: Contact) => number) | null>
  >;
}

const TableHeader: React.FC<TableHeaderProps> = ({ setSortMethod }) => {
  const [isSortingAscending, setIsSortingAscending] = useState(true);
  const [sortKey, setSortKey] = useState<keyof Contact>("name");

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

  const setSortProperty = (key: keyof Contact) => {
    if (key === sortKey) {
      setIsSortingAscending(!isSortingAscending);
    } else {
      setIsSortingAscending(true);
      setSortKey(key);
    }

    setSortMethod(() => (a: Contact, b: Contact) =>
      isSortingAscending
        ? sortAscending(a[key], b[key])
        : sortDescending(a[key], b[key])
    );
  };

  return (
    <thead>
      <tr>
        <th onClick={() => setSortProperty("name")}>Name</th>
        <th onClick={() => setSortProperty("email")}>Email</th>
        <th>Phone</th>
        <th onClick={() => setSortProperty("company")}>Company</th>
        <th onClick={() => setSortProperty("department")}>Department</th>
        <th onClick={() => setSortProperty("dateAdded")}>Date Added</th>
        <th>Skills</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
