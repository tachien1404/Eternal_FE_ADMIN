import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
const api = 'http://localhost:8080/api/public/account/'
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http:HttpClient) { }

  create(data: any): Observable<any>{
    return this.http.post<any>(
      api,
      data
      );
  }

  update(id: string, data: any): Observable<any>{
    return this.http.put<any>(
      api + id,
      data
    )
  }

  delete(id: string): Observable<any>{
    return this.http.delete<any>(
      api + id
    );
  }

  find(id: string): Observable<any>{
    return this.http.get<any>(
      api + id
    )
  }

  getAll(): Observable<Array<any>>{
    return this.http.get<Array<any>>(
      api
    )
  }

  search(email: any): Observable<Array<any>>{
    return this.http.get<Array<any>>(
      api + `search?email=${email}`
    )
  }

  uploadImage(file: FormData): Observable<any>{
    return this.http.post<any>(
      api + `image`,
      file
      );
  }

}
