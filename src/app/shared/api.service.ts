import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  url = 'https://x9yxql5ef0.execute-api.eu-central-1.amazonaws.com/prod';

  getList(): Observable<any> {
    return this.http.get<any>(`${this.url}/list`);
  }

  createCat(catData: any) {
    return this.http.post(`${this.url}/create`, catData);
  }

  getCat(id: any): Observable<any> {
    return this.http.get<any>(`${this.url}/list?id=${id}`);
  }

  deleteCat(id: string) {
    return this.http.delete(`${this.url}/delete?id=${id}`);
  }

  updateCat(id: string, catData: any) {
    return this.http.put(`${this.url}/update?id=${id}`, catData);
  }
}
