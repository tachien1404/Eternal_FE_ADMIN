import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DahuyComponent } from './dahuy.component';

describe('DahuyComponent', () => {
  let component: DahuyComponent;
  let fixture: ComponentFixture<DahuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DahuyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DahuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
