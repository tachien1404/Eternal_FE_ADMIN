import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigPromotionComponent } from './config-promotion.component';

describe('ConfigPromotionComponent', () => {
  let component: ConfigPromotionComponent;
  let fixture: ComponentFixture<ConfigPromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigPromotionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
