import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamoLibroFilterGradoSeccionComponent } from './filter-grado-seccion.component';

describe('PrestamoLibroFilterGradoSeccionComponent', () => {
  let component: PrestamoLibroFilterGradoSeccionComponent;
  let fixture: ComponentFixture<PrestamoLibroFilterGradoSeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestamoLibroFilterGradoSeccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestamoLibroFilterGradoSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
