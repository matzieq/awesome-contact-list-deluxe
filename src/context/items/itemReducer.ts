import {
  GET_ITEMS,
  CLEAR_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  DELETE_TAG,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_ITEM,
  FILTER_ITEMS,
  CLEAR_FILTER,
  ITEM_ERROR,
  ADD_TAG,
  GET_TAGS
} from "../types";
import { Item, Action, Tag } from "context/items/model";

const localStorageName = "AWESOME_GAME_LIST_DATA";

export default (state: any, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ITEMS:
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
    case ADD_ITEM:
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
    case UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map((item: Item) =>
          item._id === payload._id ? payload : item
        ),
        loading: false
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item: Item) => item._id !== payload),
        loading: false
      };
    case DELETE_TAG:
      localStorage.setItem(
        localStorageName,
        JSON.stringify({
          contactData: state.items,
          tagData: state.tags.filter((tag: Tag) => tag._id !== payload)
        })
      );
      return {
        ...state,
        tags: state.tags.filter((tag: Tag) => tag._id !== payload),
        loading: false
      };
    case CLEAR_ITEMS:
      return {
        ...state,
        items: null,
        filter: null,
        error: null,
        current: null,
        loading: true
      };
    case ITEM_ERROR:
      return { ...state, error: payload };
    case SET_CURRENT:
      return { ...state, current: payload };
    case CLEAR_CURRENT:
      return { ...state, current: null };
    case FILTER_ITEMS:
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
