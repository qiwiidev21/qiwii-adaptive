import createReducer from "../../../utils/createReducer";
import * as types from "../types";

const initialState = {
  data: [],
  page: 0,
  total: 10,
};

export const dataPaymentService = createReducer(initialState, {
  [types.SET_DATA_PAYMENT_SERVICE](state, action) {
    return {
      data: action.payload,
    };
  },
});

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

export const dataServiceSelected = createReducer(
  {},
  {
    [types.SET_DATA_SELECTED_SERVICE](state, action) {
      return {
        data: action.payload,
      };
    },
  }
);

export const dataServiceDetail = createReducer(
  {},
  {
    [types.SET_DETAIL_SERVICE](state, action) {
      return {
        data: action.payload,
      };
    },
  }
);
export const dataSlotTime = createReducer(
  {},
  {
    [types.SET_DATA_SLOT_TIME](state, action) {
      return {
        data: action.payload,
      };
    },
  }
);
export const dataSelectedDate = createReducer(
  {},
  {
    [types.SET_DATA_SELECTED_DATE](state, action) {
      return {
        data: action.payload,
      };
    },
  }
);
export const dataCustomFieldData = createReducer(
  {},
  {
    [types.SET_DATA_CUSTOM_FIELD_DATA](state, action) {
      return {
        data: action.payload,
      };
    },
  }
);
export const dataFieldData = createReducer(
  {},
  {
    [types.SET_DATA_FIELD_DATA](state, action) {
      return {
        data: action.payload,
      };
    },
  }
);
export const dataSlotTimes = createReducer(
  {},
  {
    [types.SET_DATA_SLOT_TIME_DATA](state, action) {
      return {
        data: action.payload,
      };
    },
  }
);
export const dataTicket = createReducer(
  {},
  {
    [types.SET_DATA_TICKET](state, action) {
      return {
        data: action.payload,
      };
    },
  }
);
