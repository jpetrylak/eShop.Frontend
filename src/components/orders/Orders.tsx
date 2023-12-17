import React, { useEffect, useState } from "react";
import { PagedResult, IPagingData } from "API/common";
import { IOrderModel, OrdersService } from "API/orders";
import { Grid } from "../common/grid";
import { Button } from "reactstrap";
import { OrderForm } from "./OrderForm";

const pagingInitialState: IPagingData = {
  currentPage: 1,
  resultsPerPage: 5,
  orderBy: "id",
  sortOrder: "asc",
  pageSizes: [5, 10, 20, 50]
};

const pagedResultInitialState: PagedResult<IOrderModel> = {
  currentPage: 0,
  resultsPerPage: 0,
  isEmpty: true,
  totalPages: 0,
  isNotEmpty: false,
  totalResults: 0,
  items: Array.of<IOrderModel>()
};

const Orders = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [pagingState, setPagingState] = useState<IPagingData>(pagingInitialState);
  const [pagedDataState, setPagedDataState] = useState<PagedResult<IOrderModel>>(pagedResultInitialState);
  const [orderFormModalOpened, setOrderFormModalOpened] = useState<boolean>(false);

  const editCallback = (id: any) => {
    console.log("edit: ", id);
  };

  function createOrderModalClicked() {
    setOrderFormModalOpened(true);
  }

  useEffect(() => {
    const populateOrders = async () => {
      const pagedData = await OrdersService.getOrdersAsync(pagingState);
      setPagedDataState(pagedData);
      setLoading(false);
    };

    populateOrders();
  }, [pagingState]);

  const renderOrdersTable = () => {
    return (
      <Grid loading={loading} pagedDataState={pagedDataState} pagingState={pagingState} setPagingState={setPagingState}>
        <Grid.Column fieldName="id" title="Id" />
        <Grid.Column fieldName="userEmail" title="User e-mail" />
        <Grid.Column fieldName="status" title="Status" />
        <Grid.Column fieldName="grandTotalValue" title="Grand total" />
        <Grid.Column fieldName="shippingAddress" title="Shipping address" />
        <Grid.Column fieldName="shippingDateTime" title="Shipping date" format="yyyy-MM-DD HH:mm" />
        <Grid.Column fieldName="paymentDateTime" title="Payment date" format="yyyy-MM-DD HH:mm" />
        <Grid.Column editCallback={editCallback} />
        {/*<Grid.Column renderCell={() => <EditCellTest />} />*/}
      </Grid>
    );
  };

  const contents = loading ? (
    <p>
      <em>Loading...</em>
    </p>
  ) : (
    renderOrdersTable()
  );

  return (
    <div>
      <h1 id="tabelLabel">Orders</h1>
      <Button color="primary" onClick={createOrderModalClicked}>
        Create
      </Button>

      <OrderForm openModal={orderFormModalOpened} setOpenModal={setOrderFormModalOpened} />

      {contents}
    </div>
  );
};

export { Orders };
