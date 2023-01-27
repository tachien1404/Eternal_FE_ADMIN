import {Product} from "./product";

export interface Promotion {
  id?:number;
  name?:string;
  starttime?: Date;
  endtime?: Date;
  createDate?: Date;
  updatetedDate?: Date;
  value?: number;
  delete?:boolean;
  active?:boolean;
}

export interface PromotionDetails {
  id?: number;
  product?: Product;
  promotion?: Promotion;
}
