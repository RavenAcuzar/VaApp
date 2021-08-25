import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelSendRequestPage } from './travel-send-request.page';

describe('TravelSendRequestPage', () => {
  let component: TravelSendRequestPage;
  let fixture: ComponentFixture<TravelSendRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelSendRequestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelSendRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
