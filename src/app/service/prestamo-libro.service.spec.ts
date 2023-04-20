import { TestBed } from '@angular/core/testing';

import { PrestamoLibroService } from './prestamo-libro.service';

describe('PrestamoLibroService', () => {
  let service: PrestamoLibroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrestamoLibroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
