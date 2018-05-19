import { TestBed, inject } from '@angular/core/testing';

import { OwnProfileService } from './own-profile.service';

describe('OwnProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OwnProfileService]
    });
  });

  it('should be created', inject([OwnProfileService], (service: OwnProfileService) => {
    expect(service).toBeTruthy();
  }));
});
