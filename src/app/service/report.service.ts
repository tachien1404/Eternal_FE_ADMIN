import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn:'root'
})
export class ReportService{
  api='http://localhost:8080/api/public/report/'
  constructor(private http:HttpClient) {
  }
  gettat(){
    return this.http.get(this.api+'revenue')//lấy ra năm và doanh thu theo năm
  }
  gettheoday(salesReport:any){
    return this.http.post(this.api+'theoday',salesReport)//lấy theo ngay chọn
  }
  gettheothang(salesReport:any){
    return this.http.post(this.api+'theothang',salesReport)//lấy theo ngay chọn
  }
  doanhthutheongay(){
    return this.http.get(this.api+'doanhthuhomnay')//doanh thu và số lượng đơn hôm nay
  }
  sld01(){
    return this.http.get(this.api+'sld01')//số lượng đơn status 0 và 1
  }
}
