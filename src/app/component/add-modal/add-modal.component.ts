import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css']
})
export class AddModalComponent implements OnInit {
  private isNew: boolean;
  createUserForm: FormGroup;
  constructor( public modalService: NgbActiveModal,
               public formBuilder: FormBuilder,
               public service: DataService
               
  ) {
    this.userForm();
  }

  ngOnInit(): void {
  }

  keyPress(event: any): void {
    const pattern = /[0-9\+\-|]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  userForm(): void {
    this.createUserForm = this.formBuilder.group({
      UserID: '',
      UserName: ['', Validators.required],
      UserEmail: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      UserPhone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{11}$")]]
    })
  }

  createUser() {
    const value = this.createUserForm.value;
    this.isNew = true;
    if (value) {
      this.service.save(value, this.isNew);
  }
    this.modalService.close();
  }
  
}
