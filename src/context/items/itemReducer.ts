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
  CONTACT_ERROR,
  ADD_TAG,
  GET_TAGS
} from "../types";
import { Item, Action } from "context/items/model";

const localStorageName = "AWESOME_GAME_LIST_DATA";

export default (state: any, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CONTACTS:
      return {
        ...state,
        items: payload,
        loading: false
      };
    case GET_TAGS:
      return {
        ...state,
        tags: payload,
        loading: false
      };
    case ADD_CONTACT:
      console.log("State items: ", state.items);
      localStorage.setItem(
        localStorageName,
        JSON.stringify({
          contactData: [payload, ...state.items],
          tagData: state.tags
        })
      );
      return {
        ...state,
        items: [payload, ...state.items],
        loading: false
      };
    case ADD_TAG:
      console.log("State tag: ", state.tags);
      localStorage.setItem(
        localStorageName,
        JSON.stringify({
          contactData: state.items,
          tagData: [payload, ...state.tags]
        })
      );
      return {
        ...state,
        tags: [payload, ...state.tags]
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        items: state.items.map((item: Item) =>
          item._id === payload._id ? payload : item
        ),
        loading: false
      };
    case DELETE_CONTACT:
      return {
        ...state,
        items: state.items.filter((item: Item) => item._id !== payload),
        loading: false
      };
    case CLEAR_CONTACTS:
      return {
        ...state,
        items: null,
        filter: null,
        error: null,
        current: null,
        loading: true
      };
    case CONTACT_ERROR:
      return { ...state, error: payload };
    case SET_CURRENT:
      return { ...state, current: payload };
    case CLEAR_CURRENT:
      return { ...state, current: null };
    case FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.items.filter((item: Item) => {
          const regex = new RegExp(`${payload}`, "gi");
          return item.name.match(regex) || item.platform.match(regex);
        })
      };
    case CLEAR_FILTER:
      return { ...state, filtered: null };
    default:
      return state;
  }
};
