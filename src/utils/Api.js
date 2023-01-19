import axios from "axios";
import axiosRetry from "axios-retry";
import MockAdapter from "axios-mock-adapter";
import { MOCK_NETWORK } from "../constants";
import { mockQiwii } from "../mocks/Qiwii";

const createAPI = (baseURL) => {
  let api = axios.create({
    baseURL,
    timeout: 30000,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  axiosRetry(api, {
    retries: 3,
  });

  api.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return api;
};

export const Qiwii = createAPI("https://app.qiwii.id");
if (MOCK_NETWORK) mockQiwii(new MockAdapter(Qiwii));
