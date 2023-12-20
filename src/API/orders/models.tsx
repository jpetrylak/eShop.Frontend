import { IEntityBase } from "../common";

export enum EOrderStatus {
  Created = 0,
  Paid = 1,
  Shipped = 2
}

export interface IOrderModel extends IEntityBase {
  userEmail: string;
  status: EOrderStatus;
  grandTotalValue: number;
  shippingAddress?: string;
  shippingDateTime?: Date;
  paymentDateTime?: Date;
}

export interface IOrderPosition {
  productId: number;
  productName: string;
  amount: number;
  unitPrice: number;
  totalValue: number;
}

export interface IOrderDetails extends IOrderModel {
  positions: IOrderPosition[];
}

export interface IOrderCreate {
  userEmail: string;
  shippingAddress?: string;
}
