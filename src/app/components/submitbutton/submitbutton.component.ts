import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {InputcontainerComponent} from '../inputcontainer/inputcontainer.component';
import {HttpClient} from '@angular/common/http';
import {SnackBarService} from '../snackbar.service';

@Component({
  selector: 'app-submitbutton',
  templateUrl: './submitbutton.component.html',
  styleUrls: ['./submitbutton.component.css']
})
export class SubmitbuttonComponent implements OnInit {

  firstNameMark = '[FIRST_NAME]';
  lastNameMark = '[LAST_NAME]';
  emailNameMark = '[EMAIL]';
  pcMark = '[POSTAL_CODE]';
  mpNameMark = '[MP_NAME]';

  @Input() inputsFormGroup: InputcontainerComponent;
  constructor(private http: HttpClient, private snackbar: SnackBarService) { }

  ngOnInit(): void {


  }

  onClick(): void {
    if (this.inputsFormGroup == null){
      console.log('OH NO');
    }
    const mp = this.inputsFormGroup.selectedMember;
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
    const data = this.createPostData(firstName, lastName, email, postalCode, mpData);
    console.log('data', data);
    this.http.post<any>('./send/', data).subscribe(res => {
      console.log(res);

    });








  }

  private createPostData(firstName: FormControl, lastName: FormControl,
                         email: FormControl, postalCode: FormControl, mpData): object {
    const data = {
      firstname: firstName.value,
      lastname: lastName.value,
      email: email.value,
      postalcode: postalCode.value,
      mp: mpData,
      letterData: ''
    };
    data.letterData = this.convertLetterString(data);
    return data;
  }

  private convertLetterString(data): string {
    let letter: string = this.inputsFormGroup.letter.value;
    letter = letter.replace(this.firstNameMark, data.firstname);
    letter = letter.replace(this.lastNameMark, data.lastname);
    letter = letter.replace(this.emailNameMark, data.email);
    letter = letter.replace(this.pcMark, data.postalcode);
    letter = letter.replace(this.mpNameMark, data.mp.name);

    return letter;
  }



}
