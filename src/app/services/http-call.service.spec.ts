import { TestBed } from '@angular/core/testing';

import { HttpCallService } from './http-call.service';

describe('HttpCallService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpCallService = TestBed.get(HttpCallService);
    expect(service).toBeTruthy();
  });
});
