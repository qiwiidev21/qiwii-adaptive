import * as types from "../types";
import { GET_TICKET, MERCHANT, SERVICE, SLOT_TIME } from "../../../constants";
import { Qiwii } from "../../../utils/Api";
import qs from "qs";

const setDataService = (data) => ({
  type: types.SET_DATA_SERVICE,
  payload: data,
});

const setDataIsNull = () => ({
  type: types.SET_DATA_IS_NULL,
});

export function fetchMerchantServices(id, payload) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      Qiwii.get(`${MERCHANT}/${id}?` + qs.stringify(payload))
        .then((response) => {
          if (response.data?.length) {
            dispatch(setDataService(response.data));
            resolve(response.data);
          } else {
            dispatch(setDataIsNull());
            resolve([]);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

const setSelectedService = (data) => ({
  type: types.SET_DATA_SELECTED_SERVICE,
  payload: data,
});

export function selectedService(data) {
  return (dispatch) => {
    dispatch(setSelectedService(data));
  };
}

const setDetailService = (data) => ({
  type: types.SET_DETAIL_SERVICE,
  payload: data,
});

export function fetchServiceDetail(id) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      Qiwii.get(`${SERVICE}/${id}`)
        .then((response) => {
          if (response.status === 200) {
            dispatch(setDetailService(response.data));
            resolve(response.data);
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

const setDataSlotTime = (data) => ({
  type: types.SET_DATA_SLOT_TIME,
  payload: data,
});

export function fetchSlotTime(id, format) {
  return (dispatch) => {
    let params = {
      api_user: "root",
      api_key: "1494ba401c74a879a386b5057d2e9a4f",
    };
    return new Promise((resolve, reject) => {
      Qiwii.post(`${SLOT_TIME}/${id}/${format}/mobile/`, qs.stringify(params))
        .then((response) => {
          if (response.data?.length) {
            dispatch(setDataSlotTime(response.data));
            resolve(response.data);
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

const setDataSelectedDate = (date) => ({
  type: types.SET_DATA_SELECTED_DATE,
  payload: date,
});

export function setSelectedDate(format) {
  return (dispatch) => {
    dispatch(setDataSelectedDate(format));
  };
}

const setCustomFieldData = (data) => ({
  type: types.SET_DATA_CUSTOM_FIELD_DATA,
  payload: data,
});

export function setCustomField(customField) {
  return (dispatch) => {
    dispatch(setCustomFieldData(customField));
  };
}

const setSlotTimeData = (data) => ({
  type: types.SET_DATA_SLOT_TIME_DATA,
  payload: data,
});

export function setSlotTime(timeData) {
  return (dispatch) => {
    dispatch(setSlotTimeData(timeData));
  };
}

export function getTicket(id, data, customField) {
  let formBody = [];
  for (let property in data) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(data[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }

  formBody = formBody.join("&");
  if (customField !== undefined) {
    customField.forEach((item, index) => {
      formBody = formBody + `&custom_field[${index + 1}]=` + item;
    });
  }

  return (dispatch) => {
    return new Promise((resolve, reject) => {
      Qiwii.post(`${GET_TICKET}/${id}`, formBody)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.bodyString);
        });
    });
  };
}
