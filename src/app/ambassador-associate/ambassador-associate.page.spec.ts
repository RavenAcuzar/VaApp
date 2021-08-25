import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbassadorAssociatePage } from './ambassador-associate.page';

describe('AmbassadorAssociatePage', () => {
  let component: AmbassadorAssociatePage;
  let fixture: ComponentFixture<AmbassadorAssociatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmbassadorAssociatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbassadorAssociatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
