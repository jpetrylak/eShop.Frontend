import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Badge,
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";
import { IPagedResult, IPagingWithPageSizes } from "../../API/common";
import { EOrderStatus, IOrderDetails, ordersApiClient } from "../../API/orders";
import { IProductModel, productsApiClient } from "../../API/products";
import { dateTimeUtils } from "../../utility";
import { Grid } from "../common";

const pagingInitialState: IPagingWithPageSizes = {
  currentPage: 1,
  resultsPerPage: 5,
  orderBy: "id",
  sortOrder: "asc",
  pageSizes: [5, 10, 20, 50]
};

const pagedResultInitialState: IPagedResult<IProductModel> = {
  currentPage: 0,
  resultsPerPage: 0,
  isEmpty: true,
  totalPages: 0,
  isNotEmpty: false,
  totalResults: 0,
  items: Array.of<IProductModel>()
};

const orderInitialState: IOrderDetails = {
  id: 0,
  userEmail: "",
  status: EOrderStatus.Created,
  grandTotalValue: 0,
  shippingAddress: "",
  shippingDateTime: null,
  paymentDateTime: null,
  positions: []
};

type OrderPositionsModalProps = {
  orderId: number;
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

const defaultProps: OrderPositionsModalProps = {
  orderId: 0,
  openModal: false,
  setOpenModal: () => {}
};

export const OrderEditModal = ({ orderId, openModal, setOpenModal }: OrderPositionsModalProps = defaultProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [orderState, setOrderState] = useState<IOrderDetails>(orderInitialState);
  const [pagingState, setPagingState] = useState<IPagingWithPageSizes>(pagingInitialState);
  const [pagedProductsState, setPagedProductsState] = useState<IPagedResult<IProductModel>>(pagedResultInitialState);
  const [selectedProductsState, setSelectedProductsState] = useState<number[]>([]);

  const toggle = () => setOpenModal(!openModal);

  useEffect(() => {
    const getOrderAsync = async () => {
      const apiResponse = await ordersApiClient.getOrderDetailsAsync(orderId);

      // @ts-ignore
      setOrderState(apiResponse.data);
      setLoading(false);
    };

    getOrderAsync();
  }, [orderId]);

  useEffect(() => {
    const populateProducts = async () => {
      const apiResponse = await productsApiClient.getPagedProductsAsync(pagingState);

      // @ts-ignore
      setPagedProductsState(apiResponse.data);
      setLoading(false);
    };

    populateProducts();
  }, [pagingState]);

  useEffect(() => {
    if (orderState && pagedProductsState) {
      const selectedProducts = orderState.positions.map(p => p.productId);
      setSelectedProductsState(selectedProducts);
    }
  }, [orderState, pagedProductsState]);

  const selectProductCallback = (key: number, checked: boolean) => {
    const newSelectedProductsState = checked
      ? selectedProductsState.concat([key])
      : selectedProductsState.filter(k => k != key);

    console.log({ key: key, checked: checked });

    setSelectedProductsState(newSelectedProductsState);
  };

  const renderRow = (label: string, colElement: JSX.Element) => (
    <FormGroup row>
      <Label sm={4}>{label}:</Label>
      <Col sm={8}>{colElement}</Col>
    </FormGroup>
  );

  const inputText = (value: any) => <Input disabled={true} value={value ?? ""} />;
  return (
    <>
      <Modal isOpen={openModal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit order {orderId}</ModalHeader>
        <ModalBody>
          <Form>
            {renderRow("User e-mail", inputText(orderState.userEmail))}
            {renderRow("Shipping address", inputText(orderState.shippingAddress))}
            {renderRow(
              "Status",
              <h5>
                <Badge color="primary">{orderState.status}</Badge>
              </h5>
            )}
            {renderRow("Value", inputText(orderState.grandTotalValue))}
            {renderRow("Shipping date", inputText(dateTimeUtils.format(orderState.shippingDateTime)))}
            {renderRow("Payment date", inputText(dateTimeUtils.format(orderState.paymentDateTime)))}
          </Form>

          <h6>Products</h6>
          <Grid
            loading={loading}
            selectable={true}
            selectCallback={selectProductCallback}
            pagedDataState={pagedProductsState}
            pagingState={pagingState}
            setPagingState={setPagingState}
            selectedKeys={selectedProductsState}
          >
            <Grid.Column fieldName="id" title="Id" />
            <Grid.Column fieldName="name" title="Product name" />
            <Grid.Column fieldName="price" title="Price" />
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

OrderEditModal.defaultProps = defaultProps;
