import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NomineeCategoryHolderPage } from './nominee-category-holder.page';

describe('NomineeCategoryHolderPage', () => {
  let component: NomineeCategoryHolderPage;
  let fixture: ComponentFixture<NomineeCategoryHolderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NomineeCategoryHolderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NomineeCategoryHolderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
