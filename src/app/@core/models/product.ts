export interface Product {
  id?: number;
  name?: string;
  createDate?:Date;
  outputprice?: number,
  updatedate?:Date,
  photo?: string,
  status?:number;
  category?:Category;
  hang?:Brand;
  sole?:Sole;
  shoeLine?:ShoeLine;
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


