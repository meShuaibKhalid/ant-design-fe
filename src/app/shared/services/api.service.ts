import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../modules/admin/user-list/user-list.component';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = 'http://localhost:3001/api/v1';

  constructor(private http: HttpClient) { }

  registerUser(body: any) {
    return this.http.post(`${this.baseUrl}/users`, body);
  }

  login(body: any) {
    return this.http.post(`${this.baseUrl}/users/login`, body);
  }
  getUserById(id: string) {
    return this.http.get(`${this.baseUrl}/users/` + id);
  }
  
  userList() {
    return this.http.get(`${this.baseUrl}/users`);
  }
  updateUser(body: any, id: string) {
    return this.http.patch(`${this.baseUrl}/users/` + id, body);
  }
  deleteUser(id: string) {
    return this.http.delete(`${this.baseUrl}/users/` + id);
  }
  addCarData(body: any) {
    return this.http.post(`${this.baseUrl}/cars`, body);
  }
  getallCars(filters?) {
    const params = filters ? Object.keys(filters).filter(key => filters[key] != null && encodeURIComponent(filters[key]).length)
            .map(key => `${key}=${encodeURIComponent(filters[key])}`).join('&') : '';
    return this.http.get(`${this.baseUrl}/cars?`+ params);
  }
  searchCars(filters?) {
    const params = Object.keys(filters).filter(key => filters[key] != null && encodeURIComponent(filters[key]).length)
            .map(key => `${key}=${encodeURIComponent(filters[key])}`).join('&');
    return this.http.get(`${this.baseUrl}/cars/search?`+ params);
  }
  getCarById(id) {
    return this.http.get(`${this.baseUrl}/cars/`+ id);
  }
  updateCarData(body: any, id: string) {
    return this.http.patch(`${this.baseUrl}/cars/` + id, body);
  }
  deleteCarData(id: string) {
    return this.http.delete(`${this.baseUrl}/cars/` + id);
  }
  uploadFile(file: File) {
    const fileData = new FormData();
    fileData.append("file", file);
    return this.http.post(`${this.baseUrl}/upload`, fileData);
  }
}
