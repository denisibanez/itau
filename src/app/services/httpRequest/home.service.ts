import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeHttpService {
  constructor(private http: HttpClient) {}

  getItems() {
    return this.http.get(`${environment.api_base}api/v1/itau_teste`);
  }

  getItemDetail(id: string) {
    return this.http.get(`${environment.api_base}api/v1/itau_teste/${id}`);
  }

  getZipCodeData(zipCode: string) {
    return this.http.get(`https://viacep.com.br/ws/${zipCode}/json/`);
  }
}
