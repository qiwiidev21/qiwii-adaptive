import * as types from "../types";
import { LOGIN, MENU, MENUS } from "../../../constants";
import { Qiwii } from "../../../utils/Api";
import qs from "qs";
import { isMockAllowed } from "../../../mocks/Config";

const setDataSession = (data) => ({
  type: types.SET_DATA_SESSION,
  payload: data,
});

export function loginQiwii(email, password) {
  return (dispatch) => {
    const payload = {
      email: email ? email.toLowerCase() : "",
      password,
      uuid: "ABCD1234",
    };
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
