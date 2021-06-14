import createReducer from "../../../utils/createReducer";
import * as types from "../types";

const initialState = {
  data: [],
  page: 0,
  total: 10,
};

export const dataHealthCare = createReducer(initialState, {
  [types.SET_DATA_HEALTHCARE](state, action) {
    return {
      data: action.payload.data,
      page: action.payload.current_page,
      total: action.payload.total_page,
    };
  },
  [types.SET_DATA_MORE_HEALTHCARE](state, action) {
    return {
      data: state.data.concat(action.payload.data),
      page: action.payload.current_page,
      total: action.payload.total_page,
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

export const dataOrganization = createReducer(initialState, {
  [types.SET_DATA_ORGANIZATION](state, action) {
    return {
      data: action.payload.data,
      page: action.payload.current_page,
      total: action.payload.total_page,
    };
  },
  [types.SET_DATA_MORE_ORGANIZATION](state, action) {
    return {
      data: state.data.concat(action.payload.data),
      page: action.payload.current_page,
      total: action.payload.total_page,
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

export const dataFinance = createReducer(initialState, {
  [types.SET_DATA_FINANCE](state, action) {
    return {
      data: action.payload.data,
      page: action.payload.current_page,
      total: action.payload.total_page,
    };
  },
  [types.SET_DATA_MORE_FINANCE](state, action) {
    return {
      data: state.data.concat(action.payload.data),
      page: action.payload.current_page,
      total: action.payload.total_page,
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

export const dataSalon = createReducer(initialState, {
  [types.SET_DATA_SALON](state, action) {
    return {
      data: action.payload.data,
      page: action.payload.current_page,
      total: action.payload.total_page,
    };
  },
  [types.SET_DATA_MORE_SALON](state, action) {
    return {
      data: state.data.concat(action.payload.data),
      page: action.payload.current_page,
      total: action.payload.total_page,
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

export const dataTempatWisata = createReducer(initialState, {
  [types.SET_DATA_TEMPAT_WISATA](state, action) {
    return {
      data: action.payload.data,
      page: action.payload.current_page,
      total: action.payload.total_page,
    };
  },
  [types.SET_DATA_MORE_TEMPAT_WISATA](state, action) {
    return {
      data: state.data.concat(action.payload.data),
      page: action.payload.current_page,
      total: action.payload.total_page,
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

export const dataServices = createReducer(initialState, {
  [types.SET_DATA_SERVICES](state, action) {
    return {
      data: action.payload.data,
      page: action.payload.current_page,
      total: action.payload.total_page,
    };
  },
  [types.SET_DATA_MORE_SERVICES](state, action) {
    return {
      data: state.data.concat(action.payload.data),
      page: action.payload.current_page,
      total: action.payload.total_page,
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

export const dataEntertainment = createReducer(initialState, {
  [types.SET_DATA_ENTERTAINMENT](state, action) {
    return {
      data: action.payload.data,
      page: action.payload.current_page,
      total: action.payload.total_page,
    };
  },
});

export const dataPhotos = createReducer(initialState, {
  [types.SET_DATA_PHOTOS](state, action) {
    return {
      data: action.payload.data,
      page: action.payload.current_page,
      total: action.payload.total_page,
    };
  },
  [types.SET_DATA_MORE_PHOTOS](state, action) {
    return {
      data: state.data.concat(action.payload.data),
      page: action.payload.current_page,
      total: action.payload.total_page,
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

export const dataMovies = createReducer(initialState, {
  [types.SET_DATA_MOVIES](state, action) {
    return {
      data: action.payload.data,
      page: action.payload.current_page,
      total: action.payload.total_page,
    };
  },
  [types.SET_DATA_MORE_MOVIES](state, action) {
    return {
      data: state.data.concat(action.payload.data),
      page: action.payload.current_page,
      total: action.payload.total_page,
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

export const dataEvents = createReducer(initialState, {
  [types.SET_DATA_EVENTS](state, action) {
    return {
      data: action.payload.data,
      page: action.payload.current_page,
      total: action.payload.total_page,
    };
  },
  [types.SET_DATA_MORE_EVENTS](state, action) {
    return {
      data: state.data.concat(action.payload.data),
      page: action.payload.current_page,
      total: action.payload.total_page,
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
