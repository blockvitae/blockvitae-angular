import { TestBed, inject } from '@angular/core/testing';

import { CheckMetamaskService } from './check-metamask.service';

describe('CheckMetamaskService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckMetamaskService]
    });
  });

  it('should be created', inject([CheckMetamaskService], (service: CheckMetamaskService) => {
    expect(service).toBeTruthy();
  }));
});
