import {AfterViewInit, Component, Input, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {InputcontainerComponent} from '../inputcontainer/inputcontainer.component';
import {HttpClient} from '@angular/common/http';
import {SnackBarService} from '../snackbar.service';


@Component({
  selector: 'app-submitbutton',
  templateUrl: './submitbutton.component.html',
  styleUrls: ['./submitbutton.component.css']
})
export class SubmitbuttonComponent implements OnInit, AfterViewInit {

  firstNameMark = '[your name will go here]';
  emailNameMark = '[your email address will go here]';
  pcMark = '[your location will go here]';
  mpNameMark = '[MLA’s name will go here]';
  @Output() eventEmitter = new EventEmitter<Event>();
  @Input() inputsFormGroup: InputcontainerComponent;
  @Input() event: Event;
  constructor(private http: HttpClient, private snackbar: SnackBarService) { }

  ngAfterViewInit(): void {
    }

  ngOnInit(): void {


  }

  onClick(event: Event): void {
    if (this.inputsFormGroup == null){
      console.log('OH NO');
    }
    // TODO: Finish up having a thank you page on a successful email
    // https://medium.com/@pandukamuditha/angular-5-share-data-between-sibling-components-using-eventemitter-8ebb49b64a0a
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
      this.snackbar.openSnackBar('Please Select a Representative', 'Dismiss');
    }
    if (invalid){
      return;
    }
    const mpData = this.inputsFormGroup.mpData.get(mp);
    const data = this.createPostData(firstName, lastName, email, postalCode, mpData);
    console.log('data', data);
    this.http.post<any>('./send/', data).subscribe(() => {
      this.eventEmitter.emit(event);

    }, (res) => {
      this.snackbar.openSnackBar('Something went wrong: ' + res, 'Dismiss');

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
      letterData: this.convertLetterString(firstName.value, lastName.value, email.value, postalCode.value, mpData)
    };
    return data;
  }

  private convertLetterString(firstname, lastname, email, postalcode, mp): string {
    let letter: string = this.inputsFormGroup.letter.value;
    letter = letter.replace(this.firstNameMark, firstname + ' ' + lastname);
    letter = letter.replace(this.emailNameMark, email);
    letter = letter.replace(this.pcMark, postalcode);
    letter = letter.replace(this.mpNameMark, mp.name);

    return letter;
  }



}
