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
  ADD_SKILL
} from "../types";
import { Item, Action } from "context/items/model";

export default (state: any, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CONTACTS:
      return {
        ...state,
        items: payload,
        loading: false
      };
    case ADD_CONTACT:
      return {
        ...state,
        items: [payload, ...state.items],
        loading: false
      };
    case ADD_SKILL:
      return {
        ...state,
        skills: [payload, ...state.skills]
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
          return (
            item.name.match(regex) ||
            item.email.match(regex) ||
            item.phone.match(regex)
          );
        })
      };
    case CLEAR_FILTER:
      return { ...state, filtered: null };
    default:
      return state;
  }
};
