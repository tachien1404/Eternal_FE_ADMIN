export interface S_CDetails{
  id?: number;
  product?: Product;
  size?: size;
  mau?: Color;
  quantity?: number;
  status?: number;
}

export interface S_CDetailSearch{
  id?: number;
  product?: Product;
  size?: size;
  mau?: Color;
  quantity?: number;
  status?: number;
  sortByValues?:SortByValue[]
}


export interface Product {
  id?: number;
  name?: string;
  createDate?:Date;
  inportprice?: number;
  outputprice?: number,
  updatedate?:Date
  // status?:number;
  category?:Category;
  hang?:Brand;

}
export interface Category {
  id?:number;
  name?: string;
}

export interface Brand{
  id?:number;
  name?: string;
}

export interface size{
  id?: number;
  value?:number;
}

export interface Color{
  id?: number;
  value?:number;
  name?:string;
}

export interface SortByValue{
  name?:string,
  type?:string
}

