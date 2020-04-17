import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BigPinComponent } from './big-pin.component';

describe('BigPinComponent', () => {
  let component: BigPinComponent;
  let fixture: ComponentFixture<BigPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BigPinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BigPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
