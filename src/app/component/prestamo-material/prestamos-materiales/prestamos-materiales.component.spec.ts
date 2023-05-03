import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamosMaterialesComponent } from './prestamos-materiales.component';

describe('PrestamosMaterialesComponent', () => {
  let component: PrestamosMaterialesComponent;
  let fixture: ComponentFixture<PrestamosMaterialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestamosMaterialesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestamosMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
