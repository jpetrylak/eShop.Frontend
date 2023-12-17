/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import qs from "qs";
import { ESHOP_API_URL } from "constants/app";
import { TIMEOUT } from "constants/codeStatus";
import { ProblemsResponse } from "./common";

const defaultHttpServiceConfig = {
  baseURL: ESHOP_API_URL,
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 10000,
  paramsSerializer(params: any) {
    return qs.stringify(params, {
      encode: false
    });
  }
};

const isProblemsResponse = (error: any): boolean => {
  return error.response.headers["content-type"].toString().startsWith("application/problem+json");
};

const responseSuccessInterceptorCb = (response: any) => response;

const responseErrorInterceptorCb = (error: any) => {
  if (isProblemsResponse(error)) {
    const problems = error.response.data as ProblemsResponse;
    console.log("problems: ", problems);

    return Promise.reject(problems);
  }

  if (!error.response || error.code === "ECONNABORTED") {
    // No internet, Timeout, something wrong on app side
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
