import { TestBed } from '@angular/core/testing';

import { EjemplarLibroService } from './ejemplar-libro.service';

describe('EjemplarLibroService', () => {
  let service: EjemplarLibroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EjemplarLibroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
