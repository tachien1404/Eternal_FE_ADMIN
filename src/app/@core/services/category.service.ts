import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ProductDTO} from "../models/ProductSortDTO";
import {Observable} from "rxjs";
import {CategoryDTO} from "../models/CategorySortDTO";
import {Category, Product} from "../models/product";

@Injectable({
  providedIn: 'root'
})

export class CategoryService{
  private readonly cateAPI = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getPageProduct(indexPage: any, size:any,categorySearch:CategoryDTO): Observable<any>{
    return this.http.put<any>(this.cateAPI +"public/category/sortByKey?page="+indexPage +"&size="+size,categorySearch) ;
  }

  public create(category: Category): Observable<any> {
    return this.http.post(`${environment.apiUrl}public/category`, category);
  }

  public delete(id:any): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}public/category/delete/`+id);
  }



}
