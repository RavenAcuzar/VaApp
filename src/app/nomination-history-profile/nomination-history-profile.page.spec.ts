import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominationHistoryProfilePage } from './nomination-history-profile.page';

describe('NominationHistoryProfilePage', () => {
  let component: NominationHistoryProfilePage;
  let fixture: ComponentFixture<NominationHistoryProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NominationHistoryProfilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominationHistoryProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
