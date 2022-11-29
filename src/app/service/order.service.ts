import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn:'root'
})
export class OrderService{
  api='http://localhost:8080/api/public/order'
  api2='http://localhost:8080/api/public/order-detail'
  constructor(private http:HttpClient) {
  }
  getBy0():Observable<Object>{
    return  this.http.get(this.api+'/getAllbystatus/0');//chowf xacs nhaanj
  }
  getBy1():Observable<Object>{
    return  this.http.get(this.api+'/getAllbystatus/1');//chuẩn bị hàng
  }

  getBy2():Observable<Object>{
    return  this.http.get(this.api+'/getAllbystatus/2');//đang giao
  }

  getBy3():Observable<Object> {
    return this.http.get(this.api + '/getAllbystatus/3');//Hoàn thành

  }
  getBy4():Observable<Object> {
    return this.http.get(this.api + '/getAllbystatus/4');//Hủy

  }
  getBy5():Observable<Object> {
    return this.http.get(this.api + '/getAllbystatus/5');//Trả hàng

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
  getOrderById(id:any):Observable<Object>{
    return this.http.get(this.api+'/getOrderById/'+id)
  }
  delete(id:any){
    return this.http.delete(this.api2+'/delete/'+id)
  }
}
