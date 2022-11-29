import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn:'root'
})
export  class ExportService{
  api='http://localhost:8080/api/public/export/'

  constructor(private http:HttpClient) {

  }
  pdfphieugiaohang(id:any):Observable<Blob>{
    return  this.http.get(this.api+'pdf/phieugiaohang/'+id,{responseType:'blob'});//phiếu giap hàng
  }
}
