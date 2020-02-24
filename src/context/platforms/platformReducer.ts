import {
  DELETE_PLATFORM,
  ADD_PLATFORM,
  UPDATE_PLATFORM,
  SET_EDITED_PLATFORM,
  CLEAR_EDITED_PLATFORM,
  GET_PLATFORMS
} from "../types";
import { Action, Platform } from "context/model";

import { PLATFORM_STORAGE_NAME } from "shared/constants";

export default (state: any, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PLATFORMS:
      return {
        ...state,
        platforms: payload,
        loading: false
      };

    case ADD_PLATFORM:
      console.log("State platform: ", state.platforms);
      localStorage.setItem(
        PLATFORM_STORAGE_NAME,
        JSON.stringify({
          platformData: [payload, ...state.platforms]
        })
      );
      return {
        ...state,
        platforms: [payload, ...state.platforms]
      };
    case SET_EDITED_PLATFORM:
      return { ...state, editedPlatform: payload };
    case CLEAR_EDITED_PLATFORM:
      return { ...state, editedPlatform: null };
    case UPDATE_PLATFORM:
      localStorage.setItem(
        PLATFORM_STORAGE_NAME,
        JSON.stringify({
          platformData: state.platforms.map((platform: Platform) =>
            platform._id === payload._id ? payload : platform
          )
        })
      );
      return {
        ...state,
        platforms: state.platforms.map((platform: Platform) =>
          platform._id === payload._id ? payload : platform
        )
      };

    case DELETE_PLATFORM:
      localStorage.setItem(
        PLATFORM_STORAGE_NAME,
        JSON.stringify({
          platformData: state.platforms.filter(
            (platform: Platform) => platform._id !== payload
          )
        })
      );
      return {
        ...state,
        platforms: state.platforms.filter(
          (platform: Platform) => platform._id !== payload
        )
      };
  }
};
