import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleVideoPage } from './single-video.page';

describe('SingleVideoPage', () => {
  let component: SingleVideoPage;
  let fixture: ComponentFixture<SingleVideoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleVideoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleVideoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
