import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoelineshoeComponent } from './shoelineshoe.component';

describe('ShoelineshoeComponent', () => {
  let component: ShoelineshoeComponent;
  let fixture: ComponentFixture<ShoelineshoeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoelineshoeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoelineshoeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
