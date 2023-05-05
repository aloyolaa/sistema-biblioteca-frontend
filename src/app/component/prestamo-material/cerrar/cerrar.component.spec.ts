import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamoMaterialCerrarComponent } from './cerrar.component';

describe('PrestamoMaterialCerrarComponent', () => {
  let component: PrestamoMaterialCerrarComponent;
  let fixture: ComponentFixture<PrestamoMaterialCerrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestamoMaterialCerrarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestamoMaterialCerrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
