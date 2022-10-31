import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn:'root'
})
export class CategoryService{
  api='http://localhost:8080/api/category'
  constructor(private http:HttpClient) {
  }
  getAllCategory():Observable<object>{
    return this.http.get(this.api+'/getall');
  }
  saveCategory(inputdata:any){
    if(inputdata.id!=null){
      return this.http.post(this.api+'/saveorupdate'+'/'+inputdata.id,inputdata);
    }else{
      return this.http.post(this.api+'/saveorupdate',inputdata);
    }
  }
}
