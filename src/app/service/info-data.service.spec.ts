import { TestBed } from '@angular/core/testing';

import { InfoDataService } from './info-data.service';

describe('InfoDataService', () => {
  let service: InfoDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
