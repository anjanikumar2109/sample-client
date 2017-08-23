import {TestBed, inject} from '@angular/core/testing';

import {FlowApiService} from './flow-api.service';

describe('FlowApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlowApiService]
    });
  });

  it('should be created', inject([FlowApiService], (service: FlowApiService) => {
    expect(service).toBeTruthy();
  }));
});
