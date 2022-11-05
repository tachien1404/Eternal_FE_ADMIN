import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SCDetailsComponent } from './s-c-details.component';

describe('SCDetailsComponent', () => {
  let component: SCDetailsComponent;
  let fixture: ComponentFixture<SCDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SCDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SCDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
