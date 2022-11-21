import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn :'root'
})
export  class BrandService{
  api='http://localhost:8080/api/brand'
  constructor(private http:HttpClient) {
  }
  getAllBrand():Observable<object>{
  return this.http.get(this.api+'/getAll');
  }
  saveBrand(inputdata:any){
    if(inputdata.id!=null){
      return this.http.post(this.api+'/saveOrUpdate'+'/'+inputdata.id,inputdata);
    }else{
      return this.http.post(this.api+'/saveOrUpdate',inputdata);
    }

  }
}

