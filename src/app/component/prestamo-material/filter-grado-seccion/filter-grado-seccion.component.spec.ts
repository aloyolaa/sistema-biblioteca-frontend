import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamoMaterialFilterGradoSeccionComponent } from './filter-grado-seccion.component';

describe('PrestamoMaterialFilterGradoSeccionComponent', () => {
  let component: PrestamoMaterialFilterGradoSeccionComponent;
  let fixture: ComponentFixture<PrestamoMaterialFilterGradoSeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestamoMaterialFilterGradoSeccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestamoMaterialFilterGradoSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
