import { TestBed } from '@angular/core/testing';

import { PrestamoMaterialService } from './prestamo-material.service';

describe('PrestamoMaterialService', () => {
  let service: PrestamoMaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrestamoMaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
