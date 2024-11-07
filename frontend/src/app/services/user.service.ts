import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { User } from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlBase = 'http://localhost:8080/basic-auth';
  user: User = new User;
  

  constructor(private http: HttpClient) { }

  //Gets credentials (username and password) to send them in the http request
  getCredentials(): HttpHeaders {

    //Get user from sessionStorage
    this.user = JSON.parse(sessionStorage.getItem('user') || '{}');
    //Code credentials into base64
    const credentials = btoa(`${this.user.username}:${this.user.password}`);
    //Create the HttpHeaders
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':`Basic ${credentials}`
    });
    return headers;
  }

  registerUser(user: User) {
    return this.http.post<User>(`${this.urlBase}/register`, user);
  }

  getUserByUsername(username: string) {
    return this.http.get<User>(`${this.urlBase}/get-user-by-username/${username}`);
  }

  getUsers() {
    const headers = this.getCredentials();
    console.log('Username from storage:', this.user.username);
    console.log('Password from storage:', this.user.password);
    return this.http.get<User[]>(`${this.urlBase}/get-users-list`,{headers});
  }

  getUserById(userId: number) {
    const headers = this.getCredentials();
    return this.http.get<User>(`${this.urlBase}/get-user-by-id/${userId}`,{headers});
  }

  editUser(user: User) {
    
    const headers = this.getCredentials();
    console.log('Username from storage:', this.user.username);
    console.log('Password from storage:', this.user.password);
    return this.http.put<User>(`${this.urlBase}/edit-user`, user, {headers});
  }

  deleteUser(idUser: number) {
    const headers = this.getCredentials();
    return this.http.delete(`${this.urlBase}/delete-user/${idUser}`, {headers});
  }

  loginPass(user: User) {
    return this.http.post<boolean>(`${this.urlBase}/login-pass`, user);
  }

  isLoggedIn() {
    return sessionStorage.getItem('username')!=null;
  }





}

