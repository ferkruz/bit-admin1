import { TestBed } from '@angular/core/testing';

import { ViajesfacturarAPIService } from './viajesfacturar-api.service';

describe('ViajesfacturarAPIService', () => {
  let service: ViajesfacturarAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViajesfacturarAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
