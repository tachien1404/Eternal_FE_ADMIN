import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonTaiQuayComponent } from './don-tai-quay.component';

describe('DonTaiQuayComponent', () => {
  let component: DonTaiQuayComponent;
  let fixture: ComponentFixture<DonTaiQuayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonTaiQuayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonTaiQuayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
