import {TestBed, inject} from '@angular/core/testing';

import {TemplateApiService} from './template-api.service';

describe('TemplateApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TemplateApiService]
    });
  });

  it('should be created', inject([TemplateApiService], (service: TemplateApiService) => {
    expect(service).toBeTruthy();
  }));
});
