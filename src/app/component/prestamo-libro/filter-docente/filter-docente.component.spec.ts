import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamoLibroFilterDocenteComponent } from './filter-docente.component';

describe('PrestamoLibroFilterDocenteComponent', () => {
  let component: PrestamoLibroFilterDocenteComponent;
  let fixture: ComponentFixture<PrestamoLibroFilterDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestamoLibroFilterDocenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestamoLibroFilterDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
