import * as types from "../types";
import {
  LOGIN,
  REGISTER,
  MENU,
  MENUS,
  CUSTOM_FIELD,
  GET_USER,
  GET_QUEUE,
  GET_PROMO,
  GET_CATEGORIES,
  GET_TYPES,
  VERIFY,
} from "../../../constants";
import { Qiwii } from "../../../utils/Api";
import qs from "qs";
import { isMockAllowed } from "../../../mocks/Config";

export function getPromo(categoryId) {
  return () => {
    return new Promise((resolve, reject) => {
      const params = {
        device: "mobile",
        category: categoryId,
      };
      Qiwii.get(`${GET_PROMO}?` + qs.stringify(params))
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data?.data);
          } else {
            resolve([]);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

export function setDataPromo(data) {
  return (dispatch) => {
    dispatch(setPromo(data));
  };
}

const setPromo = (data) => ({
  type: types.SET_DATA_PROMO,
  payload: data,
});

const setDataCategories = (data) => ({
  type: types.SET_DATA_CATEGORIES,
  payload: data,
});

export function getCategories(name) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      let params = {};
      if (name) {
        params["f-name"] = name;
      }
      Qiwii.get(`${GET_CATEGORIES}?` + qs.stringify(params))
        .then((response) => {
          if (response.status === 200) {
            dispatch(setDataCategories(response.data?.data));
            resolve(response.data?.data);
          } else {
            resolve([]);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

const setDataTypes = (data) => ({
  type: types.SET_DATA_TYPES,
  payload: data,
});

export function getTypes() {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      Qiwii.get(`${GET_TYPES}`)
        .then((response) => {
          if (response.status === 200) {
            dispatch(setDataTypes(response.data?.data));
            resolve(response.data?.data);
          } else {
            resolve([]);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

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

export function verifyCode(verification_code, unique_identifier) {
  let payload = {
    uuid: "ABCD1234",
    verification_code,
    unique_identifier,
  };
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      Qiwii.post(VERIFY, qs.stringify(payload))
        .then(({ data }) => {
          if (data.status === "Success") {
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

export function updateUser(
  name,
  email,
  phone,
  unique_identifier,
  password,
  oldPassword,
  token,
  uuid
) {
  let params;

  if (oldPassword) {
    params.old_password = oldPassword;
  }
  if (password) {
    params.password = password;
  }

  params = {
    unique_identifier: unique_identifier,
    uuid: uuid,
    token: token,
    name: name,
    email: email,
    phone: phone,
  };
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      Qiwii.put(REGISTER, qs.stringify(params))
        .then((response) => {
          // if (data.status === "Success") {
          //   // dispatch(setDataSession(data));
          //   resolve(data);
          // } else {
          //   reject(data.message);
          // }
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
        .catch((error) => {
          throw new Error(error);
        });
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
          if (data.status === "Success") {
            dispatch(setDataEntertainment(data.data));
          }
        })
        .catch((error) => {
          throw new Error(error);
        });
    });
  };
}

export function fetchDataCustomField(params) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      Qiwii.post(CUSTOM_FIELD, qs.stringify(params))
        .then(({ data }) => {
          resolve(data.custom_field);
        })
        .catch((error) => {
          reject(error?.response);
        });
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
          resolve(response.data);
          dispatch(setDataUserProfile(response.data));
        })
        .catch((error) => reject(error?.message));
    });
  };
}

const setDataQueue = (data) => ({
  type: types.SET_DATA_USER_QUEUE,
  payload: data,
});

const setDataQueueFinish = (data) => ({
  type: types.SET_DATA_USER_QUEUE_FINISH,
  payload: data,
});

const setDataQueueReservasi = (data) => ({
  type: types.SET_DATA_USER_QUEUE_RESERVASI,
  payload: data,
});

export function getDataQueue(unique_identifier, uuid, token) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const params = {
        unique_identifier: unique_identifier,
        uuid: uuid,
        token: token,
      };
      Qiwii.post(`${GET_QUEUE}`, qs.stringify(params))
        .then((response) => {
          if (response.data.status === "Success") {
            Promise.all([
              dispatch(setDataQueue(response.data.data.berlangsung)),
              dispatch(setDataQueueReservasi(response.data.data.reservasi)),
              dispatch(setDataQueueFinish(response.data.data.selesai)),
            ]).then(() => {
              resolve(response.data.data);
            });
          }
        })
        .catch((error) => reject(error?.message));
    });
  };
}
