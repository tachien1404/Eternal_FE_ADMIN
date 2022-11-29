import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChuanbihangComponent } from './chuanbihang.component';

describe('ChuanbihangComponent', () => {
  let component: ChuanbihangComponent;
  let fixture: ComponentFixture<ChuanbihangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChuanbihangComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChuanbihangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
