import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjemplaresMaterialesComponent } from './ejemplares-materiales.component';

describe('EjemplaresMaterialesComponent', () => {
  let component: EjemplaresMaterialesComponent;
  let fixture: ComponentFixture<EjemplaresMaterialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EjemplaresMaterialesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EjemplaresMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
