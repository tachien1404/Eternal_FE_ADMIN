import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanggiaoComponent } from './danggiao.component';

describe('DanggiaoComponent', () => {
  let component: DanggiaoComponent;
  let fixture: ComponentFixture<DanggiaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanggiaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DanggiaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
