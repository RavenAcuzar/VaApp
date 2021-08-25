import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominationHistoryPage } from './nomination-history.page';

describe('NominationHistoryPage', () => {
  let component: NominationHistoryPage;
  let fixture: ComponentFixture<NominationHistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NominationHistoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominationHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
