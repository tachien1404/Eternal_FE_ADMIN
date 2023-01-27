import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductDTO} from "../models/ProductSortDTO";
import {Product} from "../models/product";
import {Promotion, PromotionDetails} from "../models/Promotion";

const api = 'http://localhost:8080/api/public/products/'
@Injectable({
  providedIn: 'root'
})

export class PromotionService{
  private readonly productAPI = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  public create(promotion: Promotion): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}public/promotion/createPromotion`, promotion);
  }

  public getAll(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}public/promotion`);
  }

  public getPromotionById(id:any): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}public/promotion/`+id);
  }

  public config(promotionDetails:PromotionDetails): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}public/promotion/configPromotion`,promotionDetails);
  }

  public getAllDetailByPromotion(id:any): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}public/promotion/configPromotion/`+id);
  }

}
