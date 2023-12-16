import { EntityBase } from "../common";

export enum EOrderStatus {
  Created = 0,
  Paid = 1,
  Shipped = 2
}

export interface OrderModel extends EntityBase {
  userEmail: string;
  status: EOrderStatus;
  grandTotalValue: number;
  shippingAddress?: string;
  shippingDateTime?: Date;
  paymentDateTime?: Date;
}
