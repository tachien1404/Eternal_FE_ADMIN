import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn:'root'
})
export class CustomerService {
  api='http://localhost:8080/api/public/customer'
  constructor(private http:HttpClient) {

  }
  save(input:any){
    return this.http.post(this.api+'/save',input)//save
  }
  update(input:any,id:any){
    return this.http.put(this.api+'/save/'+id,input)//update
  }
  searchName(name:any){
    return this.http.get(this.api+'/searchName/'+name)//lấy theo name
  }
  getById(id:any){
    return this.http.get(this.api+'/getByid/'+id)//lấy theo id
  }

}
