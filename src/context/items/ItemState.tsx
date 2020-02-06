import React, { useReducer } from "react";
import ItemContext from "./itemContext";
import itemReducer from "./itemReducer";
import { Item, State, Skill } from "context/items/model";
import uuid from "uuid";

import {
  // GET_CONTACTS,
  CLEAR_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  ADD_SKILL
  // CONTACT_ERROR
} from "../types";

const ItemState = (props: any) => {
  const initialState: State = {
    items: [
      {
        _id: 1,
        name: "Witek Prytek",
        email: "mietek@pletwa.com",
        phone: "66666",
        company: "Pletwa",
        department: "Alpaga",
        dateAdded: new Date(2019, 6, 5),
        skills: [
          { _id: 1, name: "Wałęsanie się" },
          { _id: 2, name: "Kłapanie" }
        ]
      },
      {
        _id: 2,
        name: "Janek Dzbanek",
        email: "janek@pletwa.com",
        phone: "666667777",
        company: "Pletwa",
        department: "Grzyb",
        dateAdded: new Date(2018, 5, 10),
        skills: [
          { _id: 1, name: "Wałęsanie się" },
          { _id: 3, name: "Grzybobranie" }
        ]
      },
      {
        _id: 3,
        name: "Józek Wózek",
        email: "juzek@pletwa.com",
        phone: "66666777788",
        company: "Blob",
        department: "Pletwa",
        dateAdded: new Date(),
        skills: [
          { _id: 2, name: "Kłapanie" },
          { _id: 3, name: "Grzybobranie" }
        ]
      }
    ],
    current: null,
    filtered: null,
    error: null,
    loading: true,
    skills: [
      { _id: 1, name: "Wałęsanie się" },
      { _id: 2, name: "Kłapanie" },
      { _id: 3, name: "Grzybobranie" }
    ]
  };

  const [state, dispatch] = useReducer(itemReducer, initialState);

  // Get items
  // const getItems = async () => {

  //     dispatch({ type: GET_CONTACTS, payload: res.data });

  // };

  // Add item
  const addItem = (item: Item) => {
    item._id = uuid.v4();
    dispatch({ type: ADD_CONTACT, payload: item });
  };

  // Add skill
  const addSkill = (skill: Skill) => {
    skill._id = uuid.v4();
    dispatch({ type: ADD_SKILL, payload: skill });
  };

  // Delete item
  const deleteItem = (id: number) => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  // Clear items
  const clearItems = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  // Set current item
  const setCurrent = (item: Item) => {
    dispatch({ type: SET_CURRENT, payload: item });
  };

  // Clear current item
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Update item
  const updateItem = (item: Item) => {
    dispatch({ type: UPDATE_CONTACT, payload: item });
  };

  // Filter items
  const filterItems = (filter: string) => {
    dispatch({ type: FILTER_CONTACTS, payload: filter });
  };

  // Clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  const { items, current, filtered, error, loading, skills } = state;

  return (
    <ItemContext.Provider
      value={{
        items,
        current,
        filtered,
        error,
        loading,
        skills,

        addItem,
        addSkill,
        deleteItem,
        setCurrent,
        clearCurrent,
        updateItem,
        filterItems,
        clearFilter,
        clearItems
      }}
    >
      {props.children}
    </ItemContext.Provider>
  );
};

export default ItemState;
