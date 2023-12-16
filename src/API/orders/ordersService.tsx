import httpService from "../httpService";
import { OrderModel } from "./ordersModels";
import { AxiosResponse } from "axios";
import { PagedResult, IPagingData } from "../common";

const OrdersService = {
  getOrders: async (pagingData: IPagingData): Promise<PagedResult<OrderModel>> => {
    const pagingQueryString = toQueryString(pagingData);

    const response: AxiosResponse<PagedResult<OrderModel>> = await httpService.get<
      PagedResult<OrderModel>,
      AxiosResponse<PagedResult<OrderModel>>
    >(`api/orders?${pagingQueryString}`);

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
