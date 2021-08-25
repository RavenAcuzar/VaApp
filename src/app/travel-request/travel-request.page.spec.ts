import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelRequestPage } from './travel-request.page';

describe('TravelRequestPage', () => {
  let component: TravelRequestPage;
  let fixture: ComponentFixture<TravelRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelRequestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
