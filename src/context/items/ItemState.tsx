import React, { useReducer } from "react";
import ItemContext from "./itemContext";
import itemReducer from "./itemReducer";
import { Item, State, Skill } from "context/items/model";
import uuid from "uuid";

import {
  GET_CONTACTS,
  CLEAR_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  ADD_TAG,
  GET_TAGS
  // CONTACT_ERROR
} from "../types";

const localStorageName = "AWESOME_GAME_LIST_DATA";

const ItemState = (props: any) => {
  const initialState: State = {
    items: [],
    current: null,
    filtered: null,
    error: null,
    loading: true,
    tags: []
  };

  const [state, dispatch] = useReducer(itemReducer, initialState);

  // Get items
  const getItems = () => {
    const data =
      window.localStorage.getItem(localStorageName) == null
        ? { contactData: [], tagData: [] }
        : JSON.parse(localStorage.getItem(localStorageName) || "");
    dispatch({ type: GET_CONTACTS, payload: data.contactData });
  };

  const getTags = () => {
    const data =
      window.localStorage.getItem(localStorageName) == null
        ? { contactData: [], tagData: [] }
        : JSON.parse(localStorage.getItem(localStorageName) || "");
    dispatch({ type: GET_TAGS, payload: data.tagData });
  };

  // Add item
  const addItem = (item: Item) => {
    item._id = uuid.v4();
    dispatch({ type: ADD_CONTACT, payload: item });
  };

  // Add skill
  const addTag = (tag: Skill) => {
    tag._id = uuid.v4();
    dispatch({ type: ADD_TAG, payload: tag });
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

  const { items, current, filtered, error, loading, tags } = state;

  return (
    <ItemContext.Provider
      value={{
        items,
        current,
        filtered,
        error,
        loading,
        tags,

        getItems,
        getTags,
        addItem,
        addTag,
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
