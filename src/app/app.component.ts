import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {InputcontainerComponent} from './components/inputcontainer/inputcontainer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'MLA-Letter-Generator';


  @ViewChild(InputcontainerComponent, {static: false}) inputs: InputcontainerComponent;
  ngAfterViewInit(): void {
    console.log('Hello ', this.inputs.email);
  }
}
