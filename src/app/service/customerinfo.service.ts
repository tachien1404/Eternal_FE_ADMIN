import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn:'root'
})
export class CustomerinfoService{
  api='http://localhost:8080/api/public/cusI4'
  constructor(private http:HttpClient) {

  }
  edit(input:any){
    return this.http.post(this.api+'/edit',input);
  }
}
