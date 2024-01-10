import { ProductsEndpoints } from "./endpoints";
import { IProductModel } from "./models";
import { IApiResponse, IPagedResult, IPaging, apiClientBase, Endpoint } from "../common";

export const productsApiClient = {
  async getPagedProductsAsync(paging: IPaging): Promise<IApiResponse<IPagedResult<IProductModel>>> {
    return await apiClientBase.executeAsync<IPagedResult<IProductModel>>(
      <Endpoint>ProductsEndpoints.getPaged,
      null,
      paging
    );
  }
};

export default productsApiClient;
