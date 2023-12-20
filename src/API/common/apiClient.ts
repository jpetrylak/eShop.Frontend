import { AxiosRequestConfig, AxiosResponse } from "axios";
import { Endpoint } from "./endpoint";
import { IApiResponse, ProblemsResponse } from "./response";
import httpService from "../httpService";

export const apiClientBase = {
  async executeAsync<T = any, D = any>(endpoint: Endpoint, body?: D, params?: any): Promise<IApiResponse<T>> {
    const { method, successfulHttpCodes, problemsHttpCodes } = endpoint;
    const allCodes = [...successfulHttpCodes, ...problemsHttpCodes];

    const config: AxiosRequestConfig<D> = {
      url: endpoint.path,
      method: method,
      data: body,
      validateStatus: (status: number) => allCodes.includes(status),
      params: params
    };

    const axiosResponse: AxiosResponse<T> = await httpService.request<T, AxiosResponse<T>, D>(config);

    const isSuccessful = this.isSuccessfulStatusCode(successfulHttpCodes, axiosResponse);

    const response: IApiResponse<T> = {
      isSuccessful: isSuccessful,
      data: isSuccessful ? axiosResponse.data : null,
      problems: !isSuccessful ? (axiosResponse.data as ProblemsResponse) : null
    };

    return response;
  },

  isSuccessfulStatusCode(successfulHttpCodes: number[], response: AxiosResponse<any>): boolean {
    return successfulHttpCodes.includes(response.status);
  }
};
