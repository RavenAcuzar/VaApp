import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbassadorPartnersPage } from './ambassador-partners.page';

describe('AmbassadorPartnersPage', () => {
  let component: AmbassadorPartnersPage;
  let fixture: ComponentFixture<AmbassadorPartnersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmbassadorPartnersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbassadorPartnersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
