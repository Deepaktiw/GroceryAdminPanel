import { TestBed } from '@angular/core/testing';

import { OpenModalService } from './open-modal.service';

describe('OpenModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpenModalService = TestBed.get(OpenModalService);
    expect(service).toBeTruthy();
  });
});
