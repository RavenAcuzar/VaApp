import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsLandingPage } from './tools-landing.page';

describe('ToolsLandingPage', () => {
  let component: ToolsLandingPage;
  let fixture: ComponentFixture<ToolsLandingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsLandingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsLandingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
