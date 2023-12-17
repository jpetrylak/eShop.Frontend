import { EntityBase } from "../common";

export enum EOrderStatus {
  Created = 0,
  Paid = 1,
  Shipped = 2
}

export interface IOrderModel extends EntityBase {
  userEmail: string;
  status: EOrderStatus;
  grandTotalValue: number;
  shippingAddress?: string;
  shippingDateTime?: Date;
  paymentDateTime?: Date;
}

export interface IOrderCreate {
  userEmail: string;
  shippingAddress?: string;
}
