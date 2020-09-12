import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-submitbutton',
  templateUrl: './submitbutton.component.html',
  styleUrls: ['./submitbutton.component.css']
})
export class SubmitbuttonComponent implements OnInit {

  emailInput: FormControl;
  postalCodeInput: FormControl;
  firstNameInput: FormControl;
  lastNameInput: FormControl;
  constructor() { }

  ngOnInit(): void {


  }

}
