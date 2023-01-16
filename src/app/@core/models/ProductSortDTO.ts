export interface ProductDTO {
  id?: number;
  name?: string;
  inportprice?: number;
  outputprice?: number,
  status?:number;
  category?:Category;
  hang?:Brand;
  sole?:Sole;
  shoeLine?:ShoeLine;
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
export interface Sole {
  id?:number;
  name?: string;
}

export interface ShoeLine {
  id?:number;
  name?: string;
}

export interface SortByValue{
  name?:string,
  type?:string
}

export interface Color {
  id?:number;
  value?: string;
  name?: string;
}
