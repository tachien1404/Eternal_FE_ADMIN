import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaoDonHangComponent } from './tao-don-hang.component';

describe('TaoDonHangComponent', () => {
  let component: TaoDonHangComponent;
  let fixture: ComponentFixture<TaoDonHangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaoDonHangComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaoDonHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
