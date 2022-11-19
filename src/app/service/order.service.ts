import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn:'root'
})
export class OrderService{
  api='http://localhost:8080/api/public/order'
  constructor(private http:HttpClient) {
  }
  getBy0():Observable<Object>{
    return  this.http.get(this.api+'/getAllbystatus/0');//chowf xacs nhaanj
  }
  getBy1():Observable<Object>{
    return  this.http.get(this.api+'/getAllbystatus/1');//Ddang giAO HANGF
  }

  getBy2():Observable<Object>{
    return  this.http.get(this.api+'/getAllbystatus/2');//Hoanf thanhf
  }

  getBy3():Observable<Object> {
    return this.http.get(this.api + '/getAllbystatus/3');//Ddax huyr

  }
  updatetrangthai(input:any,id:any):Observable<Object>{
    return this.http.put(this.api+'/trangthai/'+id,input)//giao hàng
  }
  updatetatca(status:any):Observable<Object>{

    return this.http.post(this.api+'/trangthaidon/'+status,status)//giao tất
  }
  getByPage(input:any):Observable<Object>{
    return  this.http.post(this.api+'/search-by-page',input)
  }
  getOrderId(id:any):Observable<Object>{
    return this.http.get(this.api+'/getOrderId/'+id)
  }
}
