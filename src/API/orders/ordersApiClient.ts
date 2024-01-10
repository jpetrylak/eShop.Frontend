import { OrdersEndpoints } from "./endpoints";
import { IOrderCreate, IOrderDetails, IOrderModel } from "./models";
import { IApiResponse, IPagedResult, IPaging, apiClientBase, Endpoint } from "../common";

export const ordersApiClient = {
  async getPagedOrdersAsync(paging: IPaging): Promise<IApiResponse<IPagedResult<IOrderModel>>> {
    return await apiClientBase.executeAsync<IPagedResult<IOrderModel>>(
      <Endpoint>OrdersEndpoints.getPaged,
      null,
      paging
    );
  },

  async getOrderDetailsAsync(orderId: number): Promise<IApiResponse<IOrderDetails>> {
    const { getDetails } = OrdersEndpoints;
    const newPath = getDetails.path.replace("{orderId}", orderId.toString());

    return await apiClientBase.executeAsync<IOrderDetails>(<Endpoint>{ ...getDetails, path: newPath });
  },

  async createAsync(order: IOrderCreate): Promise<IApiResponse<IOrderModel>> {
    return await apiClientBase.executeAsync<IOrderModel, IOrderCreate>(<Endpoint>OrdersEndpoints.create, order);
  }
};

export default ordersApiClient;
