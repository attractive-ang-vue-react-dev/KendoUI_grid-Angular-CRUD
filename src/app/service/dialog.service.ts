import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddModalComponent } from '../component/add-modal/add-modal.component'
@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private modalService: NgbModal) { }
  addUser() {
    this.modalService.open(AddModalComponent, {
      centered: true
    })
  }
}
