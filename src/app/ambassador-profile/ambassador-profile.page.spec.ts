import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbassadorProfilePage } from './ambassador-profile.page';

describe('AmbassadorProfilePage', () => {
  let component: AmbassadorProfilePage;
  let fixture: ComponentFixture<AmbassadorProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmbassadorProfilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbassadorProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
