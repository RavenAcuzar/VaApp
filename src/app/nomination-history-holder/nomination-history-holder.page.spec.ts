import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominationHistoryHolderPage } from './nomination-history-holder.page';

describe('NominationHistoryHolderPage', () => {
  let component: NominationHistoryHolderPage;
  let fixture: ComponentFixture<NominationHistoryHolderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NominationHistoryHolderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominationHistoryHolderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
