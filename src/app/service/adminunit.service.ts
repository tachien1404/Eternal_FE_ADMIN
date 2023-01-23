import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn :'root'
})
export class AdminunitService{
  api='http://localhost:8080/api/public/administrativeUnit'
  constructor(private http:HttpClient) {
  }
  gettinhhuyenxa(input:any):Observable<object>{
    return this.http.post(this.api+'/tinhhuyenxa',input);
  }
}
