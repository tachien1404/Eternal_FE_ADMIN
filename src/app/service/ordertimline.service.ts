import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn:'root'
})
export class OrdertimlineService{
  api='http://localhost:8080/api/public/timeline'

  constructor(private http:HttpClient) {
  }
  save(input:any):Observable<Object>{
    return this.http.post(this.api+'/save',input)
  }
  getby(input:any):Observable<Object>{
    return this.http.post(this.api+'/getby',input)
  }
}
