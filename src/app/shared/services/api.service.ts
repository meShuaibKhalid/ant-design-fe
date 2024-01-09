import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = 'http://localhost:3001/api/v1';

  constructor(private http: HttpClient) {}

  registerUser(body: any) {
    return this.http.post(`${this.baseUrl}/users`, body);
  }

  login(body: any) {
    return this.http.post(`${this.baseUrl}/users/login`, body);
  }

  userList() {
    return this.http.get(`${this.baseUrl}/users`);
  }
}
