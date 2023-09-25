import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Request } from 'src/app/model/Request';
import { User } from 'src/app/model/user';
import { RequestService } from 'src/app/service/request.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})

export class ProfileComponent implements OnInit {
  public updateForm!: FormGroup;
  modalRef: BsModalRef | undefined;


  constructor(
    private userService: UserService,
    private requestService: RequestService,
    private modalService: BsModalService,

  ) {}

  async ngOnInit(): Promise<void> {
    this.createForm();
    await this.getUserData();
    this.getUserRequests();
  }

  private token = window.localStorage.getItem('token') as string;
  data: User = <User>{};
  requests: Request[] = Array<Request>();

  async getUserData(): Promise<void> {
    await new Promise(resolve => {
      this.userService.getUserData(this.token).subscribe({
        next: (response: User) => {
          this.data = response
          this.updateForm.patchValue({
            name: this.data.name,
            cpf: this.data.cpf,
            email: this.data.email,
            ocupation: this.data.ocupation,
            phone: this.data.phone,
            organization: this.data.organization,
          });
        },
        complete: () => {
          resolve(true);
        }
      });
    });
  }

  update(): void {
    this.userService.updateUser(this.updateForm.value, this.token).subscribe({
      complete: () => {
        location.reload();
      }
    });
  }

  getUserRequests(): void {
    this.requestService.getAllUserRequest(this.token).subscribe({
      next: (response: Request[]) => {
        this.requests = response
      }
    });
  }

  createForm(): void {
    this.updateForm = new FormGroup({
      name: new FormControl(''),
      cpf: new FormControl(''),
      email: new FormControl(''),
      ocupation: new FormControl(''),
      phone: new FormControl(''),
      organization: new FormControl(''),
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.modalRef?.hide();
  }
}

