import {
  GET_ITEMS,
  CLEAR_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_ITEM,
  FILTER_ITEMS,
  CLEAR_FILTER,
  ITEM_ERROR
} from "../types";
import { Item, Action } from "context/model";
import { ITEM_STORAGE_NAME } from "shared/constants";

export default (state: any, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ITEMS:
      return {
        ...state,
        items: payload,
        loading: false
      };

    case ADD_ITEM:
      console.log("State items: ", state.items);
      localStorage.setItem(
        ITEM_STORAGE_NAME,
        JSON.stringify({
          contactData: [payload, ...state.items]
        })
      );
      return {
        ...state,
        items: [payload, ...state.items],
        loading: false
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
