/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import qs from "qs";
import { ESHOP_API_URL } from "constants/app";
import { TIMEOUT } from "constants/codeStatus";

const defaultHttpServiceConfig = {
  baseURL: ESHOP_API_URL,
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 30000,
  paramsSerializer(params: any) {
    return qs.stringify(params, {
      encode: false
    });
  }
};

const responseSuccessInterceptorCb = (response: any) => response;

const responseErrorInterceptorCb = (error: any) => {
  // No internet, Timeout, something wrong on app side
  if (!error.response || error.code === "ECONNABORTED") {
    // eslint-disable-next-line no-param-reassign
    error.response = {
      status: TIMEOUT
    };
  }

  return Promise.reject(error.response);
};

const httpService = axios.create({ ...defaultHttpServiceConfig });
httpService.interceptors.response.use(responseSuccessInterceptorCb, responseErrorInterceptorCb);

export default httpService;
