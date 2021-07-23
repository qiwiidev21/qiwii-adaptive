import * as types from "../types";
import {
  LOGIN,
  REGISTER,
  MENU,
  MENUS,
  CUSTOM_FIELD,
  GET_USER,
} from "../../../constants";
import { Qiwii } from "../../../utils/Api";
import qs from "qs";
import { isMockAllowed } from "../../../mocks/Config";

const setDataSession = (data) => ({
  type: types.SET_DATA_SESSION,
  payload: data,
});

export function loginQiwii(email, phone, password) {
  return (dispatch) => {
    let payload;
    if (email !== "") {
      payload = {
        email: email ? email.toLowerCase() : "",
        password,
        uuid: "ABCD1234",
      };
    } else {
      payload = {
        phone,
        password,
        uuid: "ABCD1234",
      };
    }
    return new Promise((resolve, reject) => {
      Qiwii.post(
        LOGIN,
        isMockAllowed("Qiwii", LOGIN) ? payload : qs.stringify(payload)
      )
        .then(({ data }) => {
          console.log(data);
          if (data.status === "Success") {
            dispatch(setDataSession(data));
            resolve(data);
          } else {
            reject(data.message);
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response) {
            reject(error.response);
          } else if (error.request) {
            reject(error.request);
          } else if (error.message) {
            reject(error.message);
          }
        });
    });
  };
}

export function registerQiwii(name, email, phone, password) {
  let payload = {
    name,
    email,
    phone,
    password,
    uuid: "ABCD1234",
  };
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      Qiwii.post(REGISTER, qs.stringify(payload))
        .then(({ data }) => {
          if (data.status === "Success") {
            // dispatch(setDataSession(data));
            resolve(data);
          } else {
            reject(data.message);
          }
        })
        .catch((error) => {
          if (error.response) {
            reject(error.response);
          } else if (error.request) {
            reject(error.request);
          } else if (error.message) {
            reject(error.message);
          }
        });
    });
  };
}

const setDataMenu = (data) => ({
  type: types.SET_DATA_MENU,
  payload: data,
});

export function fetchMenuCategory() {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      Qiwii.get(MENU)
        .then(({ data }) => {
          if (data.status === "Success") {
            dispatch(setDataMenu(data.data));
          }
        })
        .catch((error) => console.log(error));
    });
  };
}

const setDataEntertainment = (data) => ({
  type: types.SET_DATA_MENUS,
  payload: data,
});

export function fetchEntertainmentCategory() {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      Qiwii.get(MENUS)
        .then(({ data }) => {
          console.log(data);
          if (data.status === "Success") {
            dispatch(setDataEntertainment(data.data));
          }
        })
        .catch((error) => console.log(error));
    });
  };
}

const setDataCustomField = (data) => ({
  type: types.SET_DATA_CUSTOM_FIELD,
  payload: data,
});

export function fetchDataCustomField(params) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      Qiwii.post(CUSTOM_FIELD, qs.stringify(params))
        .then(({ data }) => {
          dispatch(setDataCustomField(data.custom_field));
        })
        .catch((error) => console.log(error));
    });
  };
}

const setDataUserProfile = (data) => ({
  type: types.SET_DATA_USER_PROFILE,
  payload: data,
});

export function getDataUser(unique_identifier, uuid, token) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const params = {
        unique_identifier: unique_identifier,
        uuid: uuid,
        token: token,
      };
      Qiwii.get(`${GET_USER}?` + qs.stringify(params))
        .then((response) => {
          dispatch(setDataUserProfile(response.data));
        })
        .catch((error) => reject(error?.message));
    });
  };
}
