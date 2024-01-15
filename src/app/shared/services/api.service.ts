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
  getallCars() {
    return this.http.get(`${this.baseUrl}/cars`);
  }
  getCarById() {
    return this.http.get(`${this.baseUrl}/cars`);
  }
  updateCarData(body: any, id: string) {
    return this.http.patch(`${this.baseUrl}/cars/` + id, body);
  }
  deleteCarData(id: string) {
    return this.http.delete(`${this.baseUrl}/cars/` + id);
  }
}
