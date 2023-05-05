import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamoMaterialFilterDocenteComponent } from './filter-docente.component';

describe('PrestamoMaterialFilterDocenteComponent', () => {
  let component: PrestamoMaterialFilterDocenteComponent;
  let fixture: ComponentFixture<PrestamoMaterialFilterDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestamoMaterialFilterDocenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestamoMaterialFilterDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
