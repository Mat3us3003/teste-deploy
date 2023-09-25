import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Schedule } from '../model/schedule';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(
    private http: HttpClient
  ) { }

  private url: string = environment.API_URL + '/schedule';

  insertSchedule(info: any, token: string): Observable<Schedule> {
    const body = {
      event_name: info.event_name,
      request_name: info.user_name,
      start_date: info.start_date,
      end_date: info.end_date,
      start_time: info.start_time,
      end_time: info.end_time,
      id_room: info.id_room_fk
    };

    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + `${token}`
      })
    };

    return this.http.post<Schedule>(`${this.url}`, body, httpOptions);
  }
}
