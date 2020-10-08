import { TestBed } from '@angular/core/testing';

import { AuthServiseService } from './auth-servise.service';

describe('AuthServiseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthServiseService = TestBed.get(AuthServiseService);
    expect(service).toBeTruthy();
  });
});
