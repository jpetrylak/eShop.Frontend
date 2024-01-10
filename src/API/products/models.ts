import { IEntityBase } from "../common";

export interface IProductModel extends IEntityBase {
  name: string;
  price: number;
}
