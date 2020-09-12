import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitbuttonComponent } from './submitbutton.component';

describe('SubmitbuttonComponent', () => {
  let component: SubmitbuttonComponent;
  let fixture: ComponentFixture<SubmitbuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitbuttonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
