/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DeGiayComponent } from './de-giay.component';

describe('DeGiayComponent', () => {
  let component: DeGiayComponent;
  let fixture: ComponentFixture<DeGiayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeGiayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeGiayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
