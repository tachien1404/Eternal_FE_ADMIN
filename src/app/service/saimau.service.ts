import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn:'root'
})
export class SaimauService{
  api='http://localhost:8080/api/public/s_c_details'
  constructor(private http:HttpClient) {
  }
  congsl(input:any):Observable<Object>{
    return this.http.post(this.api+'/congsl',input)
  }
  trusl(input:any):Observable<Object>{
    return this.http.post(this.api+'/trusl',input)
  }
  getsize(input:any):Observable<Object>{
    return this.http.post(this.api+'/getsize',input)
  }
}
