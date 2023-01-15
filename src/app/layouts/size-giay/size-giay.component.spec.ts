/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SizeGiayComponent } from './size-giay.component';

describe('SizeGiayComponent', () => {
  let component: SizeGiayComponent;
  let fixture: ComponentFixture<SizeGiayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SizeGiayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SizeGiayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
