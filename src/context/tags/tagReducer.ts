import {
  DELETE_TAG,
  ADD_TAG,
  UPDATE_TAG,
  SET_EDITED_TAG,
  CLEAR_EDITED_TAG,
  GET_TAGS
} from "../types";
import { Action, Tag } from "context/model";

import { TAG_STORAGE_NAME } from "shared/constants";

export default (state: any, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_TAGS:
      return {
        ...state,
        tags: payload,
        loading: false
      };

    case ADD_TAG:
      console.log("State tag: ", state.tags);
      localStorage.setItem(
        TAG_STORAGE_NAME,
        JSON.stringify({
          tagData: [payload, ...state.tags]
        })
      );
      return {
        ...state,
        tags: [payload, ...state.tags]
      };
    case SET_EDITED_TAG:
      return { ...state, editedTag: payload };
    case CLEAR_EDITED_TAG:
      return { ...state, editedTag: null };
    case UPDATE_TAG:
      localStorage.setItem(
        TAG_STORAGE_NAME,
        JSON.stringify({
          tagData: state.tags.map((tag: Tag) =>
            tag._id === payload._id ? payload : tag
          )
        })
      );
      return {
        ...state,
        tags: state.tags.map((tag: Tag) =>
          tag._id === payload._id ? payload : tag
        )
      };

    case DELETE_TAG:
      localStorage.setItem(
        TAG_STORAGE_NAME,
        JSON.stringify({
          tagData: state.tags.filter((tag: Tag) => tag._id !== payload)
        })
      );
      return {
        ...state,
        tags: state.tags.filter((tag: Tag) => tag._id !== payload)
      };
  }
};
