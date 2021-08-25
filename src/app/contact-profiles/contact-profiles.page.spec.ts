import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactProfilesPage } from './contact-profiles.page';

describe('ContactProfilesPage', () => {
  let component: ContactProfilesPage;
  let fixture: ComponentFixture<ContactProfilesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactProfilesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactProfilesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
