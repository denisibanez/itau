import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ExampleHttpService {
  baseUrl = 'https://randomuser.me/api/';

  constructor(private http: HttpClient) {}

  exampleHttp() {
    return this.http.get(`${this.baseUrl}`);
  }
}
