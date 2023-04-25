import { TestBed } from '@angular/core/testing';

import { EjemplarMaterialService } from './ejemplar-material.service';

describe('EjemplarMaterialService', () => {
  let service: EjemplarMaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EjemplarMaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
