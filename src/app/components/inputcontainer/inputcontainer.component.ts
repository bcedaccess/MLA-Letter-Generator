import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {LetterText} from '../lettertext';
import {MatRadioGroup} from '@angular/material/radio';
import {MLA} from '../missingmlas';
import {SnackBarService} from '../snackbar.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-inputcontainer',
  templateUrl: './inputcontainer.component.html',
  styleUrls: ['./inputcontainer.component.css']
})
export class InputcontainerComponent implements OnInit, AfterViewInit {

  constructor(private snackbar: SnackBarService, private http: HttpClient) { }

  @Input() event: Event;
  valid = false;
  selectedMember: string;
  member;
  members = [];
  mpData = new Map();
  @ViewChild('radioGroup') radioGroup: MatRadioGroup;
  letterText = LetterText.text;
  radioButtons = new FormControl('', [Validators.required] );
  letter = new FormControl('');
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  postalCode = new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/)]);
  @Input() myForm: FormGroup = new FormGroup({email: this.email, firstName: this.firstName,
                                                    lastName: this.lastName, postalCode: this.postalCode,
                                                      radiobuttons: this.radioButtons, letter: this.letter});
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

  // TODO: Be able to parse for both MLAs and Candidates
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
    }).then(async (json) => {
      // console.log(json);
      const reps = json.representatives_centroid;
      const dis = [];
      const mlas = [];
      for (const b of json.boundaries_centroid) {
        if (b.boundary_set_name === 'British Columbia electoral district' && !dis.includes(b.name)){
          dis.push(b.name);
          const params = new HttpParams();
          params.set('dist', b.name);
          const r = await this.http.get<any>(`/reps/:${b.name.replace(' ', '%20')}`, {}).toPromise();
          r.forEach( d => {
            if (!mlas.includes(d)){
              mlas.push(d);
            }
          });
        }
      }
      console.log('MLAS', mlas);

      // reps.forEach((rep) => {
      //   if (rep.elected_office === 'MLA'){
      //     console.log(rep);
      //     mlas.push(rep);
      //   }
      // });


      return mlas;
    }).then((mlas) => {
      this.members = [];
      this.valid = false;

      mlas.forEach((m) => {
        this.members.push(m.name + ', ' + m.party_name);
        this.mpData.set(m.name + ', ' + m.party_name, m);
        this.valid = true;
      });

      if (this.members.length === 0){
        this.members.push('We can\'t find a MLA Candidate in your district (or one with a valid email)');
        this.valid = false;
      }




    });


  }

  ngOnInit(): void {
    this.myDiv = document.getElementById('#repConatiner');
    this.letter.setValue(this.letterText);
  }


  ngAfterViewInit(): void {
  }


  onCheck(): void {
    this.selectedMember = this.members[0];
  }


  onRadioChange(): void {

  }
}
