import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateCategoryHolderPage } from './corporate-category-holder.page';

describe('CorporateCategoryHolderPage', () => {
  let component: CorporateCategoryHolderPage;
  let fixture: ComponentFixture<CorporateCategoryHolderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateCategoryHolderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateCategoryHolderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
