import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsUserPage } from './details-user.page';

describe('DetailsUserPage', () => {
  let component: DetailsUserPage;
  let fixture: ComponentFixture<DetailsUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsUserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
