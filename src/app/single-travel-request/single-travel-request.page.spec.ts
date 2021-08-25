import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTravelRequestPage } from './single-travel-request.page';

describe('SingleTravelRequestPage', () => {
  let component: SingleTravelRequestPage;
  let fixture: ComponentFixture<SingleTravelRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleTravelRequestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleTravelRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
