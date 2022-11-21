import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductDTO} from "../models/ProductSortDTO";
import {Product} from "../models/product";

@Injectable({
  providedIn: 'root'
})

export class ProductService{
  private readonly productAPI = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getAllProduct():Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}public/rest/products`);
  }


  getPageProduct(indexPage: any, size:any,dto:ProductDTO): Observable<any>{
    return this.http.put<any>(this.productAPI +"public/rest/products/sortByKey?page="+indexPage +"&size="+size,dto) ;
  }

  public getAllCate():Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}public/rest/products/getAllCategory`);
  }

  public getAllBrand():Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}public/rest/products/getAllBrand`);
  }

  public create(product: Product): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}public/rest/products`, product);
  }

  public getProductById(id:any):Observable<any>{
    return this.http.get<any>(`${this.productAPI}public/rest/products/`+id);
  }

  public delete(id:any): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}public/rest/products/delete/`+id);
  }

  public update(id:any,product: Product): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}public/rest/products/`+id, product);
  }

}
