import React, { useReducer } from "react";
import ItemContext from "./itemContext";
import itemReducer from "./itemReducer";
import { Item } from "context/model";
import uuid from "uuid";
import { ITEM_STORAGE_NAME } from "shared/constants";

import {
  GET_ITEMS,
  CLEAR_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_ITEM,
  FILTER_ITEMS,
  CLEAR_FILTER

  // ITEM_ERROR
} from "../types";

const ItemState = (props: any) => {
  const initialState: any = {
    items: [],
    current: null,
    filtered: null,
    error: null,
    loading: true
  };

  const [state, dispatch] = useReducer(itemReducer, initialState);

  // Get items
  const getItems = () => {
    const data =
      window.localStorage.getItem(ITEM_STORAGE_NAME) == null
        ? { contactData: [] }
        : JSON.parse(localStorage.getItem(ITEM_STORAGE_NAME) || "");
    dispatch({ type: GET_ITEMS, payload: data.contactData });
  };

  // Add item
  const addItem = (item: Item) => {
    item._id = uuid.v4();
    dispatch({ type: ADD_ITEM, payload: item });
  };

  // Delete item
  const deleteItem = (id: number) => {
    dispatch({ type: DELETE_ITEM, payload: id });
  };

  // Clear items
  const clearItems = () => {
    dispatch({ type: CLEAR_ITEMS });
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
    dispatch({ type: UPDATE_ITEM, payload: item });
  };

  // Filter items
  const filterItems = (filter: string) => {
    dispatch({ type: FILTER_ITEMS, payload: filter });
  };

  // Clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  const { items, current, filtered, error, loading } = state;

  return (
    <ItemContext.Provider
      value={{
        items,
        current,
        filtered,
        error,
        loading,

        getItems,

        addItem,
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
