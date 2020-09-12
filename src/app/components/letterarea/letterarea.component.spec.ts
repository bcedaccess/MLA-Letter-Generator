import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterareaComponent } from './letterarea.component';

describe('LetterareaComponent', () => {
  let component: LetterareaComponent;
  let fixture: ComponentFixture<LetterareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LetterareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
