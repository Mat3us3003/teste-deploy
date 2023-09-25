import { RequestService } from 'src/app/service/request.service';
import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/model/Request';
import { AppComponent } from 'src/app/app.component';
import { ScheduleService } from 'src/app/service/schedule.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit{
  constructor(
    private requestService: RequestService,
    private scheduleService: ScheduleService,
    private appComponent: AppComponent
  ){}

  ngOnInit(): void {
    this.getRequests();
  }


  private token = window.localStorage.getItem('token') as string;
  data: Request = <Request>{};
  requests: Request[] = Array<Request>();

  getRequests(): void {
    this.requestService.getAllAuthorizer(this.token).subscribe({
      next: (response: Request[]) => {
        this.requests = response
      }
    });
  }

  authorize(item: any): void {
    if(confirm('Deseja mesmo autorizar esse evento?')) {
      this.scheduleService.insertSchedule(item, this.token).subscribe({
        next: () => {
          const body = {
            id_request: item.id_request,
            status: "AGENDADO"
          };
      
          this.requestService.updateRequestStatus(body, this.token).subscribe({
            next: () => {
              location.reload();
            }
          });
        }
      });
     }
   } 
  denyAuthorization(item: any): void {
    if(confirm('Deseja mesmo negar esse evento?')) {
      const body = {
        id_request: item.id_request,
        status: "NEGADO"
      };

      this.requestService.updateRequestStatus(body, this.token).subscribe({
        next: () => {
          location.reload();
        }
      })
    }
  }
  
}
