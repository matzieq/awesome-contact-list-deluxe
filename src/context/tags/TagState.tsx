import React, { useReducer } from "react";
import TagContext from "./tagContext";
import tagReducer from "./tagReducer";
import { Tag } from "context/model";
import uuid from "uuid";
import M from "materialize-css";
import { TAG_STORAGE_NAME } from "shared/constants";

import {
  DELETE_TAG,
  UPDATE_TAG,
  ADD_TAG,
  GET_TAGS,
  SET_EDITED_TAG,
  CLEAR_EDITED_TAG

  // ITEM_ERROR
} from "../types";

const TagState = (props: any) => {
  const initialState: any = {
    tags: [],
    editedTag: null
  };

  const [state, dispatch] = useReducer(tagReducer, initialState);

  const getTags = () => {
    const data =
      window.localStorage.getItem(TAG_STORAGE_NAME) == null
        ? { tagData: [] }
        : JSON.parse(localStorage.getItem(TAG_STORAGE_NAME) || "");
    dispatch({ type: GET_TAGS, payload: data.tagData });
  };

  // Add tag
  const addTag = (tag: Tag) => {
    if (state.tags.find(existingTag => existingTag.name === tag.name)) {
      M.toast({ html: "Tag already exists." });
      return;
    }
    tag._id = uuid.v4();
    dispatch({ type: ADD_TAG, payload: tag });
  };

  const updateTag = (tag: Tag) => {
    dispatch({ type: UPDATE_TAG, payload: tag });
  };

  const deleteTag = (id: number) => {
    dispatch({ type: DELETE_TAG, payload: id });
  };

  const setEditedTag = (tag: Tag) => {
    dispatch({ type: SET_EDITED_TAG, payload: tag });
  };

  const clearEditedTag = () => {
    dispatch({ type: CLEAR_EDITED_TAG });
  };

  const { tags, editedTag } = state;

  return (
    <TagContext.Provider
      value={{
        tags,
        editedTag,

        getTags,

        addTag,
        updateTag,

        deleteTag,

        setEditedTag,
        clearEditedTag
      }}
    >
      {props.children}
    </TagContext.Provider>
  );
};

export default TagState;
