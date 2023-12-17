import httpService from "../httpService";
import { IOrderCreate, IOrderModel } from "./ordersModels";
import { AxiosResponse } from "axios";
import { PagedResult, IPagingData } from "../common";

const OrdersService = {
  getOrdersAsync: async (pagingData: IPagingData): Promise<PagedResult<IOrderModel>> => {
    const pagingQueryString = toQueryString(pagingData);

    const response: AxiosResponse<PagedResult<IOrderModel>> = await httpService.get<
      PagedResult<IOrderModel>,
      AxiosResponse<PagedResult<IOrderModel>>
    >(`api/orders?${pagingQueryString}`);

    return response.data;
  },

  createAsync: async (order: IOrderCreate): Promise<void> => {
    const response: AxiosResponse = await httpService.post<AxiosResponse>("api/orders", order);

    console.log("response: ", response);
  },

  createAsync2: async (order: IOrderCreate): Promise<void> => {
    const config = {
      validateStatus: function (status: number) {
        return status == 409 || status == 400;
      }
    };

    const response: AxiosResponse = await httpService.post<AxiosResponse>("api/orders", order, config);

    return response.data;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toQueryString = (obj: any): string => {
  const str = [];
  for (const p in obj)
    if (Object.prototype.hasOwnProperty.call(obj, p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};

const isProblemsResponse = (error: any): boolean => {
  return error.response.headers["content-type"].toString().startsWith("application/problem+json");
};

export default OrdersService;

// const getOrder = async params => {
//
// };
//
// const getHistoryLogs = async params => {
//
// };
//
// const createOrder = async params => {
//
// };
//
// const getPositions = async params => {
//
// };
//
//
// const createPosition = async params => {
//
// };
//
// const deletePosition = async params => {
//
// };
//
// const pay = async params => {
//
// };
//
// const ship = async params => {
//
// };
