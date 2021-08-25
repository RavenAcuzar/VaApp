import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbassadorContactPage } from './ambassador-contact.page';

describe('AmbassadorContactPage', () => {
  let component: AmbassadorContactPage;
  let fixture: ComponentFixture<AmbassadorContactPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmbassadorContactPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbassadorContactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
