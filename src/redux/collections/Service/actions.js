import * as types from "../types";
import { MERCHANT } from "../../../constants";
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
