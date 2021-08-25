import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVaPage } from './edit-va.page';

describe('EditVaPage', () => {
  let component: EditVaPage;
  let fixture: ComponentFixture<EditVaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
