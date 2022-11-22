import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ProductDTO} from "../models/ProductSortDTO";
import {Observable} from "rxjs";
import {S_CDetails, S_CDetailSearch} from "../models/SCDetails";
import {Product} from "../models/product";

@Injectable({
  providedIn: 'root'
})

export class SCDetailsService{
  private readonly SCDetailAPI = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getPageSC(indexPage: any, size:any,categorySearch:S_CDetailSearch): Observable<any>{
    return this.http.put<any>(this.SCDetailAPI +"public/s_c_details/sortByKey?page="+indexPage +"&size="+size,categorySearch) ;
  }

  public getAllColor():Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}public/s_c_details/getAllColor`);
  }

  public getAllSize():Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}public/s_c_details/getAllSize`);
  }
  public getAllProduct():Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}public/s_c_details/getAllProduct`);
  }

  public create(scDetails: S_CDetails): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}public/s_c_details`, scDetails);
  }

}
