import {Component, Input, OnInit} from '@angular/core';
import {Form, FormControl, FormGroup} from '@angular/forms';
import {InputcontainerComponent} from '../inputcontainer/inputcontainer.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-submitbutton',
  templateUrl: './submitbutton.component.html',
  styleUrls: ['./submitbutton.component.css']
})
export class SubmitbuttonComponent implements OnInit {

  @Input() inputsFormGroup: InputcontainerComponent;
  constructor() { }

  ngOnInit(): void {


  }

  onClick(): void {
    if (this.inputsFormGroup == null){
      console.log('OH NO');
    }
    const firstName: FormControl = this.inputsFormGroup.firstName;
    if (firstName.invalid){

      this.inputsFormGroup.getFirstNameErrorMessage();
    }

    const lastName: FormControl = this.inputsFormGroup.lastName;
    const email: FormControl = this.inputsFormGroup.email;
    const postalCode: FormControl = this.inputsFormGroup.postalCode;
    console.log(firstName.value, lastName.value, email.value, postalCode.value);

  }

}
