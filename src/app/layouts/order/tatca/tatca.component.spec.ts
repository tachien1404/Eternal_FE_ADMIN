import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TatcaComponent } from './tatca.component';

describe('TatcaComponent', () => {
  let component: TatcaComponent;
  let fixture: ComponentFixture<TatcaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TatcaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TatcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
