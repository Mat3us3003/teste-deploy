import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Request } from '../model/Request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private http: HttpClient,
  ) { }

  private url: string = environment.API_URL + '/request';

  getAllUserRequest(token: string): Observable<Request[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + `${token}`
      })
    };    
    return this.http.get<Request[]>(`${this.url}/user`, httpOptions);
  }

  getAllRequests(token: string): Observable<Request[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + `${token}`
      })
    };    
    return this.http.get<Request[]>(`${this.url}`, httpOptions);
  }

  getAllAuthorizer(token: string): Observable<Request[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + `${token}`
      })
    };
    return this.http.get<Request[]>(`${this.url}/authorizer`, httpOptions);
  }
  
  updateRequestStatus(info: any ,token: string): Observable<Request> {
    const body = {
      id_request: info.id_request,
      status: info.status
    };

    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + `${token}`
      })
    };

    return this.http.put<Request>(`${this.url}`, body, httpOptions);
  }
}
