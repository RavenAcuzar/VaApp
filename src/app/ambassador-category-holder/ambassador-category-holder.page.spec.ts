import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbassadorCategoryHolderPage } from './ambassador-category-holder.page';

describe('AmbassadorCategoryHolderPage', () => {
  let component: AmbassadorCategoryHolderPage;
  let fixture: ComponentFixture<AmbassadorCategoryHolderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmbassadorCategoryHolderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbassadorCategoryHolderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
