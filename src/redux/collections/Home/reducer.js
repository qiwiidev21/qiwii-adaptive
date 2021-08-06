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
export const dataCategories = createReducer(
  {},
  {
    [types.SET_DATA_CATEGORIES](state, action) {
      return {
        data: action.payload,
      };
    },
  }
);

export const dataTypes = createReducer(
  {},
  {
    [types.SET_DATA_TYPES](state, action) {
      return {
        data: action.payload,
      };
    },
  }
);

const initialState = {
  data: [],
  page: 0,
  total: 10,
};

export const dataUserQueue = createReducer(initialState, {
  [types.SET_DATA_USER_QUEUE](state, action) {
    return {
      data: action.payload,
      page: 1,
      total: action.payload?.length,
    };
  },
  [types.SET_DATA_IS_NULL](state, action) {
    return {
      data: [],
      page: 0,
      total: 0,
    };
  },
});

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
