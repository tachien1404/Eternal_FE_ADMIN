import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonOffComponent } from './don-off.component';

describe('DonOffComponent', () => {
  let component: DonOffComponent;
  let fixture: ComponentFixture<DonOffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonOffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
