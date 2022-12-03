export interface Product {
  id?: number;
  name?: string;
  createDate?:Date;
  inportprice?: number;
  outputprice?: number,
  updatedate?:Date,
  photo?: string,
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
