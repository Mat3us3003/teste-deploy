import { Component, ViewChild, ElementRef, TemplateRef, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AppComponent } from 'src/app/app.component';
import { TagField } from 'src/app/class/tag-field';
import { RoomService } from 'src/app/service/room.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{

  insertForm = new FormGroup({
    name: new FormControl(''),
    capacity: new FormControl(''),
    type: new FormControl(''),
    location: new FormControl(''),
    especifity: new FormControl('')
  })

  modalRef: BsModalRef | undefined;
  tagField!: TagField;

  @ViewChild('equipmentSelect') equipmentSelect!: ElementRef ;
  @ViewChild('quantityInput') quantityInput!: ElementRef ;
  @ViewChild('equipmentList') equipmentList!: ElementRef;

  constructor(
    private appComponent: AppComponent,
    private modalService: BsModalService,
    private roomService: RoomService
  ) {}

  token = window.localStorage.getItem('token') as string;;

  insert(): void {
    let equipamentos: any = [];

    this.tagField.tagsValue.forEach((tag: any) => {
      tag = tag[Object.keys(tag)[0]];

      equipamentos.push({
        name: tag[0].value,
        quantity: tag[1].value
      })
    });

    this.roomService.insertRoom(this.insertForm.value, equipamentos, this.token).subscribe({
      next: () => {
        location.reload();
      }, error(err) {
          console.log(err);
      },
    });
  }

  initTagField() {
    this.tagField = new TagField({
      tagFields: '[data-tagfield="field"]',
      tagContainer: '[data-tagfield="container"]',
      tagButton: '[data-tagfield="button"]',
    });

    this.tagField.init();
  }

  isAdmin(): boolean {
    return this.appComponent.isAdmin();
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.initTagField();
  }

  closeModal() {
    this.modalRef?.hide();
  }
}
