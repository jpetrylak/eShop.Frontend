import React, { useEffect, useState } from "react";
import { PagedResult, PagingData } from "services/common/pagingModels";
import { OrderModel } from "services/orders/ordersModels";
import { OrdersService } from "services/orders/ordersService";
import Grid from "./common/grid";

const FetchOrders = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [pagedResult, setPagedResult] = useState<PagedResult<OrderModel>>(null);

  // Takes the place of componentDidMount()
  useEffect(() => {
    const populateOrders = async () => {
      const pagingData: PagingData = {
        page: 1,
        results: 10,
        orderBy: "id",
        sortOrder: "asc"
      };

      const response = await OrdersService.getOrders(pagingData);
      setPagedResult(response);
      setLoading(false);
    };

    populateOrders();
  }, []);

  const contents = loading ? (
    <p>
      <em>Loading...</em>
    </p>
  ) : (
    renderOrdersTable(pagedResult)
  );

  return (
    <div>
      <h1 id="tabelLabel">Weather forecast</h1>
      <p>This component demonstrates fetching data from the server.</p>
      {contents}
    </div>
  );
};

const renderOrdersTable = (pageResult: PagedResult<OrderModel>): React.JSX.Element => {
  return (
    <Grid pagedData={pageResult}>
      <Grid.Column fieldName="id" title="Id" />
      <Grid.Column fieldName="userEmail" title="User e-mail" />
      <Grid.Column fieldName="status" title="Status" />
      <Grid.Column fieldName="grandTotalValue" title="Grand total" />
      <Grid.Column fieldName="shippingAddress" title="Shipping address" />
      <Grid.Column fieldName="shippingDateTime" title="Shipping date" />
      <Grid.Column fieldName="paymentDateTime" title="Payment date" />
    </Grid>
  );
};

export { FetchOrders };
