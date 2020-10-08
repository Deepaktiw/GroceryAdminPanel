import { TestBed, inject } from '@angular/core/testing';

import { DynamicLoadScriptService } from './dynamic-load-script.service';

describe('DynamicLoadScriptService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DynamicLoadScriptService]
    });
  });

  it('should be created', inject([DynamicLoadScriptService], (service: DynamicLoadScriptService) => {
    expect(service).toBeTruthy();
  }));
});
