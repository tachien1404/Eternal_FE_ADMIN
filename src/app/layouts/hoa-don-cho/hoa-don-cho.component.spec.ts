import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoaDonChoComponent } from './hoa-don-cho.component';

describe('HoaDonChoComponent', () => {
  let component: HoaDonChoComponent;
  let fixture: ComponentFixture<HoaDonChoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoaDonChoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoaDonChoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
