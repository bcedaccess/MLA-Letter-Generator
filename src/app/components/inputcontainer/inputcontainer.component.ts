import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {LetterText} from '../lettertext';

@Component({
  selector: 'app-inputcontainer',
  templateUrl: './inputcontainer.component.html',
  styleUrls: ['./inputcontainer.component.css']
})
export class InputcontainerComponent implements OnInit, AfterViewInit {

  constructor() { }
  members = [];
  selected;
  letterText = LetterText.text;
  radioButtons = new FormControl('', [Validators.required] );
  letter = new FormControl('');
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  postalCode = new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/)]);
  @Input() myForm: FormGroup = new FormGroup({email: this.email, firstName: this.firstName,
                                                    lastName: this.lastName, postalCode: this.postalCode});
  myDiv: HTMLElement;
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

  getRadioButtonErrorMessage(): string {
    if (this.radioButtons.hasError('required')) {
      return 'You must enter a value';
    }

  }

  onPostalCodeChange(): void {
    if (this.postalCode.invalid){
      console.log('Postal not done');
      return;
    }
    else{
      console.log('Postal Code Done.');
    }
    const pc: string = this.postalCode.value.toString().toUpperCase().replace(/\s/g, '');
    console.log(pc);
    fetch(`https://represent.opennorth.ca/postcodes/${pc}/`).then((response) => {
      return response.json();
    }).then((json) => {
      // console.log(json);
      const reps = json.representatives_centroid;
      const mlas = [];
      reps.forEach((rep) => {
        if (rep.elected_office === 'MLA'){
          console.log(rep);
          mlas.push(rep);
        }
      });
      return mlas;
    }).then((mlas) => {
      console.log(mlas);

      mlas.forEach((m) => {
        this.members.push(m.name);
      });


    });


  }

  ngOnInit(): void {
    this.myDiv = document.getElementById('#repConatiner');
  }


  ngAfterViewInit(): void {
  }



}
