import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamoLibroCerrarComponent } from './cerrar.component';

describe('PrestamoLibroCerrarComponent', () => {
  let component: PrestamoLibroCerrarComponent;
  let fixture: ComponentFixture<PrestamoLibroCerrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestamoLibroCerrarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestamoLibroCerrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
