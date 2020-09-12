import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarerrorComponent } from './snackbarerror.component';

describe('SnackbarerrorComponent', () => {
  let component: SnackbarerrorComponent;
  let fixture: ComponentFixture<SnackbarerrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnackbarerrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarerrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
