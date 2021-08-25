import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateProfilePage } from './corporate-profile.page';

describe('CorporateProfilePage', () => {
  let component: CorporateProfilePage;
  let fixture: ComponentFixture<CorporateProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateProfilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
