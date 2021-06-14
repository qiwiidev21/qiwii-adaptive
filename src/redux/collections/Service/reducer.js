import createReducer from "../../../utils/createReducer";
import * as types from "../types";

const initialState = {
  data: [],
  page: 0,
  total: 10,
};

export const dataService = createReducer(initialState, {
  [types.SET_DATA_SERVICE](state, action) {
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
