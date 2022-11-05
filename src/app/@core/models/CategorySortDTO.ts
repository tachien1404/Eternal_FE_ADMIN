
export interface CategoryDTO {
  id?:number;
  name?: string;
  sortByValues?:SortByValue[]
}

export interface SortByValue{
  name?:string,
  type?:string
}
