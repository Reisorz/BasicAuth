import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Roles } from '../model/roles';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  
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

  getRoleById(roleId: number): Observable<Roles> {
    return this.http.get<Roles>(`${this.urlBase}/get-role-by-id/${roleId}`);
  }

  getRoles() {
    const headers = this.getCredentials();
    return this.http.get<Roles[]>(`${this.urlBase}/get-roles`,{headers})
  }
}
