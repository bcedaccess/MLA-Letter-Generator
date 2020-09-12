import { Component, OnInit } from '@angular/core';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-inputcontainer',
  templateUrl: './inputcontainer.component.html',
  styleUrls: ['./inputcontainer.component.css']
})
export class InputcontainerComponent implements OnInit {

  constructor() { }
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  postalCode = new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/)]);
  myForm: FormGroup = new FormGroup({email: this.email});
  getFirstNameErrorMessage(): string {
    if (this.firstName.hasError('required')) {
      return 'You must enter a value';
    }
  }

  getLastNameErrorMessage(): string {
    if (this.lastName.hasError('required')) {
      return 'You must enter a value';
    }
  }


  getEmailErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPostalCodeErrorMessage(): string {
    if (this.postalCode.hasError('required')){
      return 'You must enter a value';
    }
    return this.postalCode.hasError('pattern') ? 'Not a valid postal code' : '';
  }

  ngOnInit(): void {

  }



}
