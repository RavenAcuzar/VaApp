import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTravelRequestPage } from './create-travel-request.page';

describe('CreateTravelRequestPage', () => {
  let component: CreateTravelRequestPage;
  let fixture: ComponentFixture<CreateTravelRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTravelRequestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTravelRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
