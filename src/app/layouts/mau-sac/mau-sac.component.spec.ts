/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MauSacComponent } from './mau-sac.component';

describe('MauSacComponent', () => {
  let component: MauSacComponent;
  let fixture: ComponentFixture<MauSacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MauSacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MauSacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
