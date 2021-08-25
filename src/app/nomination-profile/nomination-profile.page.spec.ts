import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominationProfilePage } from './nomination-profile.page';

describe('NominationProfilePage', () => {
  let component: NominationProfilePage;
  let fixture: ComponentFixture<NominationProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NominationProfilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominationProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
