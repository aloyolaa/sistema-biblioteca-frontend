import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamoMaterialFilterDescripcionComponent } from './filter-descripcion.component';

describe('PrestamoMaterialFilterDescripcionComponent', () => {
  let component: PrestamoMaterialFilterDescripcionComponent;
  let fixture: ComponentFixture<PrestamoMaterialFilterDescripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestamoMaterialFilterDescripcionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestamoMaterialFilterDescripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
