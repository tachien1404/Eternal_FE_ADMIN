import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaGiaoComponent } from './da-giao.component';

describe('DaGiaoComponent', () => {
  let component: DaGiaoComponent;
  let fixture: ComponentFixture<DaGiaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaGiaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaGiaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
