import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {InputcontainerComponent} from './components/inputcontainer/inputcontainer.component';
import {SubmitbuttonComponent} from './components/submitbutton/submitbutton.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'MLA-Letter-Generator';


  @ViewChild(InputcontainerComponent, {static: false}) inputs: InputcontainerComponent;
  @ViewChild(SubmitbuttonComponent, {static: false}) submit: SubmitbuttonComponent;
  ngAfterViewInit(): void {
    console.log('Hello ', this.inputs.email);
    this.submit.inputsFormGroup = this.inputs;
  }
}
