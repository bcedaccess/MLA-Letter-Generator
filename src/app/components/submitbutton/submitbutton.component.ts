import {Component, Input, OnInit} from '@angular/core';
import {Form, FormControl, FormGroup} from '@angular/forms';
import {InputcontainerComponent} from '../inputcontainer/inputcontainer.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {first} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-submitbutton',
  templateUrl: './submitbutton.component.html',
  styleUrls: ['./submitbutton.component.css']
})
export class SubmitbuttonComponent implements OnInit {

  @Input() inputsFormGroup: InputcontainerComponent;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {


  }

  onClick(): void {
    if (this.inputsFormGroup == null){
      console.log('OH NO');
    }
    const mp = this.inputsFormGroup.selectedMember;
    const selected: FormControl = this.inputsFormGroup.radioButtons;
    const firstName: FormControl = this.inputsFormGroup.firstName;
    const lastName: FormControl = this.inputsFormGroup.lastName;
    const email: FormControl = this.inputsFormGroup.email;
    const postalCode: FormControl = this.inputsFormGroup.postalCode;
    let invalid = false;
    console.log('SELECTED: ' , mp);
    if (firstName.invalid){
      this.inputsFormGroup.firstName.markAsTouched();
      invalid = true;
    }
    if (lastName.invalid){
      this.inputsFormGroup.lastName.markAsTouched();
      invalid = true;
    }
    if (email.invalid){
      this.inputsFormGroup.email.markAsTouched();
      invalid = true;
    }
    if (postalCode.invalid){
      this.inputsFormGroup.postalCode.markAsTouched();
      invalid = true;
    }
    if (!mp){
      invalid = true;
    }
    if (invalid){
      return;
    }
    const mpData = this.inputsFormGroup.mpData.get(mp);
    this.http.post('./send/', { title: 'Angular POST Request Example' }).subscribe(data => {
      console.log(data);
    });








  }



}
