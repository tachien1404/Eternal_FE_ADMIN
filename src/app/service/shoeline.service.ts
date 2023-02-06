import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ShoeLine } from '../@core/models/product';
const api = 'http://localhost:8080/api/public/shoelines/'

@Injectable({
  providedIn: 'root'
})
export class ShoelineService {
  constructor(private http: HttpClient) { }

  create(data: any): Observable<any> {
    return this.http.post<any>(
      api,
      data
    );
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put<any>(
      api + id,
      data
    )
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(
      api + id
    );
  }

  find(id: number): Observable<any> {
    return this.http.get<any>(
      api + id
    )
  }

  getAll(page: number = 0): Observable<Array<any>> {
    return this.http.get<Array<any>>(
      api + `?page=${page}&size=5`
    )
  }

  search(keyword: any, status: any): Observable<Array<any>> {
    return this.http.get<Array<any>>(
      api + `search?keyword=${keyword}&status=${status}`
    )
  }

  getPage(indexPage: any, size: any, dto: ShoeLine): Observable<any> {
    return this.http.get<Array<any>>(
      api + `?page=${indexPage}&size=${size}`
    )
  }
}
