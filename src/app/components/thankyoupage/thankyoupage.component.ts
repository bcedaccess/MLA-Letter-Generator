import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-thankyoupage',
  templateUrl: './thankyoupage.component.html',
  styleUrls: ['./thankyoupage.component.css']
})
export class ThankyoupageComponent implements OnInit {


  @Input() event: Event;
  constructor() { }


  ngOnInit(): void {
  }

}
