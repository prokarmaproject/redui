/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { APIWrapperService } from './apiwrapper.service';

describe('APIWrapperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [APIWrapperService]
    });
  });

  it('should ...', inject([APIWrapperService], (service: APIWrapperService) => {
    expect(service).toBeTruthy();
  }));
});
