import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HauptmenuComponent } from './hauptmenu.component';

describe('HauptmenuComponent', () => {
  let component: HauptmenuComponent;
  let fixture: ComponentFixture<HauptmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HauptmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HauptmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
