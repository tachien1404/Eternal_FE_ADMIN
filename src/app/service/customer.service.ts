import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {map} from "rxjs";

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

  searchSdt(sdt:any){
    return this.http.get(this.api+'/searchSdt/'+sdt)//lấy theo name
  }

  getById(id:any){
    return this.http.get(this.api+'/getByid/'+id)//lấy theo id
  }

  getFeeShip(address: string, province: string, district: string) {
    console.log(address);
    console.log(province);
    console.log(district);
    let data = {
      package_type: 'express',
      pick_province: 'Hà Nội',
      pick_district: 'Quận Từ Liêm',
      province,
      district,
      address,
      weight: 500,
      value: 0,
      tags: [14],
      transport: 'road',
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${environment.token_ghtk}`,
    });
    return this.http
      .post(`${environment.apiGHTK}`, data, { headers })
      .pipe(
        map((res: any) => {
          if (res.success) {
            return res.fee.ship_fee_only;
          }
          return 0;
        })
      );
  }
}
