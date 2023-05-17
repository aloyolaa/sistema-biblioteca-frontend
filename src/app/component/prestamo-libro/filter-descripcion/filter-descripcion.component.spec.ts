import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamoLibroFilterDescripcionComponent } from './filter-descripcion.component';

describe('PrestamoLibroFilterDescripcionComponent', () => {
  let component: PrestamoLibroFilterDescripcionComponent;
  let fixture: ComponentFixture<PrestamoLibroFilterDescripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestamoLibroFilterDescripcionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestamoLibroFilterDescripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
