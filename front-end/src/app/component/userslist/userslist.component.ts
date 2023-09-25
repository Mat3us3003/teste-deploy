import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.scss']
})
export class UserslistComponent implements OnInit{

  public updateForm!: any;

  constructor(
    private userService: UserService,
    private modalService: BsModalService,
  ){}

  ngOnInit(): void {
    this.getAllUsers();
    this.createForm();
  }

  private token = window.localStorage.getItem('token') as string;
  data: User[] = Array<User>();

   getAllUsers(): void {
      this.userService.getAllUsers(this.token).subscribe({
        next: (response:User[]) => {
          this.data = response;
        }
      });
  }

  updateFormValues(value:any): void{
    this.updateForm.patchValue({
      id: value.id_user,
      name: value.name,
      cpf: value.cpf,
      email: value.email,
      ocupation: value.ocupation,
      phone: value.phone,
      organization: value.organization,
      type: value.type
    });
  }

  createForm(): void {
    this.updateForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      cpf: new FormControl(''),
      email: new FormControl(''),
      ocupation: new FormControl(''),
      phone: new FormControl(''),
      organization: new FormControl(''),
      type: new FormControl('')
    });
  }

  update(): void {
    this.userService.updateUserById(this.updateForm.value, this.updateForm.value.id).subscribe({
      complete: () => {
        location.reload();
      }, error(err) {
          console.log(err)
      },
    });
  }

  deleteUser(id: number): void {
    if(confirm('Deseja mesmo deletar esse usuário do sistema?')) {
      this.userService.deleteUser(id, this.token).subscribe({
        complete: () => {
          location.reload();
        }, error(err) {
            console.log(err)
        },
      });
    }
  }

  modalRef: BsModalRef | undefined;

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.modalRef?.hide();
  }
}
