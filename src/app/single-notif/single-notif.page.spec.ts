import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleNotifPage } from './single-notif.page';

describe('SingleNotifPage', () => {
  let component: SingleNotifPage;
  let fixture: ComponentFixture<SingleNotifPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleNotifPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleNotifPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
