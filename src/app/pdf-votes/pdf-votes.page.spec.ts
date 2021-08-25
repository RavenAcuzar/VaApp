import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfVotesPage } from './pdf-votes.page';

describe('PdfVotesPage', () => {
  let component: PdfVotesPage;
  let fixture: ComponentFixture<PdfVotesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfVotesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfVotesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
