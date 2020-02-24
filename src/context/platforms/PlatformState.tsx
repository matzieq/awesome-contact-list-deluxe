import React, { useReducer } from "react";
import PlatformContext from "./platformContext";
import platformReducer from "./platformReducer";
import { Platform } from "context/model";
import uuid from "uuid";
import M from "materialize-css";
import { PLATFORM_STORAGE_NAME } from "shared/constants";

import {
  DELETE_PLATFORM,
  UPDATE_PLATFORM,
  ADD_PLATFORM,
  GET_PLATFORMS,
  SET_EDITED_PLATFORM,
  CLEAR_EDITED_PLATFORM

  // ITEM_ERROR
} from "../types";

const PlatformState = (props: any) => {
  const initialState: any = {
    platforms: [],
    editedPlatform: null
  };

  const [state, dispatch] = useReducer(platformReducer, initialState);

  const getPlatforms = () => {
    const data =
      window.localStorage.getItem(PLATFORM_STORAGE_NAME) == null
        ? { platformData: [] }
        : JSON.parse(localStorage.getItem(PLATFORM_STORAGE_NAME) || "");
    dispatch({ type: GET_PLATFORMS, payload: data.platformData });
  };

  // Add platform
  const addPlatform = (platform: Platform) => {
    if (
      state.platforms.find(
        existingPlatform => existingPlatform.name === platform.name
      )
    ) {
      M.toast({ html: "Platform already exists." });
      return;
    }
    platform._id = uuid.v4();
    dispatch({ type: ADD_PLATFORM, payload: platform });
  };

  const updatePlatform = (platform: Platform) => {
    dispatch({ type: UPDATE_PLATFORM, payload: platform });
  };

  const deletePlatform = (id: number) => {
    dispatch({ type: DELETE_PLATFORM, payload: id });
  };

  const setEditedPlatform = (platform: Platform) => {
    dispatch({ type: SET_EDITED_PLATFORM, payload: platform });
  };

  const clearEditedPlatform = () => {
    dispatch({ type: CLEAR_EDITED_PLATFORM });
  };

  const { platforms, editedPlatform } = state;

  return (
    <PlatformContext.Provider
      value={{
        platforms,
        editedPlatform,

        getPlatforms,

        addPlatform,
        updatePlatform,

        deletePlatform,

        setEditedPlatform,
        clearEditedPlatform
      }}
    >
      {props.children}
    </PlatformContext.Provider>
  );
};

export default PlatformState;
