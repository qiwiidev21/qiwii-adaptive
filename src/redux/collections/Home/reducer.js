import createReducer from "../../../utils/createReducer";
import * as types from "../types";

export const dataSession = createReducer(
  {},
  {
    [types.SET_DATA_SESSION](state, action) {
      return {
        data: action.payload,
      };
    },
  }
);

export const dataUserProfile = createReducer(
  {},
  {
    [types.SET_DATA_USER_PROFILE](state, action) {
      return {
        data: action.payload,
      };
    },
  }
);

export const dataMenu = createReducer(
  {},
  {
    [types.SET_DATA_MENU](state, action) {
      return {
        data: action.payload,
      };
    },
  }
);

export const dataMenus = createReducer(
  {},
  {
    [types.SET_DATA_MENUS](state, action) {
      return {
        data: action.payload,
      };
    },
  }
);

export const dataCustomField = createReducer(
  {},
  {
    [types.SET_DATA_CUSTOM_FIELD](state, action) {
      return {
        data: action.payload,
      };
    },
  }
);
