export interface ProductDTO {
  id?: number;
  name?: string;
  inportprice?: number;
  outputprice?: number,
  // status?:number;
  category?:Category;
  photo?: string,
  hang?:Brand;
  sortByValues?:SortByValue[]

}

export interface Category {
  id?:number;
  name?: string;
}

export interface Brand{
  id?:number;
  name?: string;
}

export interface SortByValue{
  name?:string,
  type?:string
}
