import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.css']
})
export class TextboxComponent implements OnInit {

  title = 'Education Assistants need Standards of Practice';
  description = 'Education Assistants play a crucial role in our education system – they support all students, and ' +
    'predominantly children with disabilities. <strong>To date, there are no standards of practice for ' +
    'Education Assistants in BC</strong>. Provincially mandated standards of practice for Education ' +
    'Assistants are overdue. Standards will contribute to a high quality of education and ultimately ' +
    'will protect all children.\n' +
    'You are invited to use this form to call on the BC Government to work with stakeholders to ' +
    'create provincially mandated standards of practice for Education Assistants. As a vital member ' +
    'of the teaching team, Education Assistants need consistent training prior to being hired, along ' +
    'with better working conditions. Fill in your information and click “Send to your MLA Candidate”. You can ' +
    'also add your own personal feedback before sending.';
  @Input() event: Event;
  constructor() { }

  ngOnInit(): void {

  }

}

