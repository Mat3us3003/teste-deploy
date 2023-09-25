import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  private url: string = environment.API_URL + '/user';
  private type!: string;
  private logged: boolean = false;

  login(info: any): Observable<any> {
    const body = {
      email: info.email,
      password: info.password
    };

    return this.http.post(this.url + '/login', body).pipe(
      map((data: any) => {
        if (data.token) {
          this.type = data.type;
          this.logged = true
          return {
            login: true,
            token: data.token,
            message: 'Login efetuado com sucesso!',
            type: data.type
          };
        }

        return {
          login: false,
          token: data.customMessage,
          message: 'Erro no login!',
          type: null
        };
      }),
      catchError((error) => {
        return of({
          login: false,
          token: null,
          message: error.error ? error.error.customMessage : 'Erro desconhecido',
          type: null
        });
      })
    );
  }

  isLogged(token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + `${token}`
      })
    };

    return this.http.get(`${this.url}/logged`, httpOptions);
  }

  isAuthorizer(): boolean {
    return this.type === 'Authorizer';
  }

  isAdmin(): boolean {
    return this.type === 'Admin';
  }

  getUserData(token: string): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + `${token}`
      })
    };
    return this.http.get<User>(`${this.url}/data`, httpOptions);
  }

  getAllUsers(token: string): Observable<User[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + `${token}`
      })
    };
    return this.http.get<User[]>(`${this.url}`, httpOptions);
  }

  updateUser(info: any, token: string): Observable<User> {
    const body = {
      name: info.name,
      cpf: info.cpf,
      email: info.email,
      ocupation: info.ocupation,
      phone: info.phone,
      organization: info.organization
    };

    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + `${token}`
      })
    };

    return this.http.put<User>(`${this.url}`, body, httpOptions);
  }

  updateUserById(info: any, id: number): Observable<User> {
    const body = {
      name: info.name,
      cpf: info.cpf,
      email: info.email,
      ocupation: info.ocupation,
      phone: info.phone,
      organization: info.organization
    };

    return this.http.put<User>(`${this.url}/${id}`, body);
  }

  insertUser(info: any): Observable<User> {
    const body = {
      name: info.name,
      cpf: info.cpf,
      email: info.email,
      password: info.password
    };

    return this.http.post<User>(`${this.url}`, body);
  }

  deleteUser(id: number, token: string): Observable<void> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + `${token}`
      })
    };

    return this.http.delete<void>(`${this.url}/${id}`, httpOptions);
  }
}
