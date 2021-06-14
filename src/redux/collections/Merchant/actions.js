import * as types from "../types";
import { ORGANIZATION } from "../../../constants";
import { Qiwii } from "../../../utils/Api";
import qs from "qs";

const setDataHealthCare = (data) => ({
  type: types.SET_DATA_HEALTHCARE,
  payload: data,
});

const setDataMoreHealthCare = (data) => ({
  type: types.SET_DATA_MORE_HEALTHCARE,
  payload: data,
});

const setDataOrganization = (data) => ({
  type: types.SET_DATA_ORGANIZATION,
  payload: data,
});

const setDataMoreOrganization = (data) => ({
  type: types.SET_DATA_MORE_ORGANIZATION,
  payload: data,
});

const setDataFinance = (data) => ({
  type: types.SET_DATA_FINANCE,
  payload: data,
});

const setDataMoreFinance = (data) => ({
  type: types.SET_DATA_MORE_FINANCE,
  payload: data,
});

const setDataSalon = (data) => ({
  type: types.SET_DATA_SALON,
  payload: data,
});

const setDataMoreSalon = (data) => ({
  type: types.SET_DATA_MORE_SALON,
  payload: data,
});

const setDataServices = (data) => ({
  type: types.SET_DATA_SERVICES,
  payload: data,
});

const setDataMoreServices = (data) => ({
  type: types.SET_DATA_MORE_SERVICES,
  payload: data,
});

const setDataEvents = (data) => ({
  type: types.SET_DATA_EVENTS,
  payload: data,
});

const setDataMoreEvents = (data) => ({
  type: types.SET_DATA_MORE_EVENTS,
  payload: data,
});

const setDataPhotos = (data) => ({
  type: types.SET_DATA_PHOTOS,
  payload: data,
});

const setDataMorePhotos = (data) => ({
  type: types.SET_DATA_MORE_PHOTOS,
  payload: data,
});

const setDataTempatWisata = (data) => ({
  type: types.SET_DATA_TEMPAT_WISATA,
  payload: data,
});

const setDataMoreTempatWisata = (data) => ({
  type: types.SET_DATA_MORE_TEMPAT_WISATA,
  payload: data,
});

const setDataMovies = (data) => ({
  type: types.SET_DATA_MOVIES,
  payload: data,
});

const setDataMoreMovies = (data) => ({
  type: types.SET_DATA_MORE_MOVIES,
  payload: data,
});

const setDataIsNull = () => ({
  type: types.SET_DATA_IS_NULL,
});

export function fetchOrganizations(payload, organization) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      Qiwii.get(ORGANIZATION + qs.stringify(payload))
        .then((response) => {
          if (response.status === 200) {
            if (Number(response.data.current_page) === 1) {
              switch (organization) {
                case "kesehatan":
                  dispatch(setDataHealthCare(response.data));
                  break;
                case "pemerintahan":
                  dispatch(setDataOrganization(response.data));
                  break;
                case "keuangan":
                  dispatch(setDataFinance(response.data));
                  break;
                case "salon":
                  dispatch(setDataSalon(response.data));
                  break;
                case "services":
                  dispatch(setDataServices(response.data));
                  break;
                case "events":
                  dispatch(setDataEvents(response.data));
                  break;
                case "photoStudio":
                  dispatch(setDataPhotos(response.data));
                  break;
                case "tempatwisata":
                  dispatch(setDataTempatWisata(response.data));
                  break;
                case "bioskop":
                  dispatch(setDataMovies(response.data));
                  break;
                default:
                  dispatch(setDataHealthCare(response.data));
              }
              resolve(response.data);
            } else {
              switch (organization) {
                case "kesehatan":
                  dispatch(setDataMoreHealthCare(response.data));
                  break;
                case "pemerintahan":
                  dispatch(setDataMoreOrganization(response.data));
                  break;
                case "keuangan":
                  dispatch(setDataMoreFinance(response.data));
                  break;
                case "salon":
                  dispatch(setDataMoreSalon(response.data));
                  break;
                case "services":
                  dispatch(setDataMoreServices(response.data));
                  break;
                case "events":
                  dispatch(setDataMoreEvents(response.data));
                  break;
                case "photoStudio":
                  dispatch(setDataMorePhotos(response.data));
                  break;
                case "tempatwisata":
                  dispatch(setDataMoreTempatWisata(response.data));
                  break;
                case "bioskop":
                  dispatch(setDataMoreMovies(response.data));
                  break;
                default:
                  dispatch(setDataMoreHealthCare(response.data));
              }
              resolve(response.data);
            }
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
