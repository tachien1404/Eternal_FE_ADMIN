import { TestBed } from '@angular/core/testing';

import { ShoelineService } from './shoeline.service';

describe('ShoelineService', () => {
  let service: ShoelineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoelineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
