import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Room } from '../model/Room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(
    private http: HttpClient
  ) { }

  private url: string = environment.API_URL + '/room';

  insertRoom(info: any, equipments: object, token: string): Observable<Room> {
    const body = {
      name: info.name,
      capacity: info.capacity,
      type: info.type,
      location: info.location,
      especifity: info.especifity,
      equipments: equipments
    };

    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + `${token}`
      })
    }
    return this.http.post<Room>(`${this.url}`, body, httpOptions);
  }
}
