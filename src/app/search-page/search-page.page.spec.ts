import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPagePage } from './search-page.page';

describe('SearchPagePage', () => {
  let component: SearchPagePage;
  let fixture: ComponentFixture<SearchPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
