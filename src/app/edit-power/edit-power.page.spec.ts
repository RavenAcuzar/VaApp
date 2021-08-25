import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPowerPage } from './edit-power.page';

describe('EditPowerPage', () => {
  let component: EditPowerPage;
  let fixture: ComponentFixture<EditPowerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPowerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPowerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
