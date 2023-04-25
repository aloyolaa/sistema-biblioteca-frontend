import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjemplaresLibrosComponent } from './ejemplares-libros.component';

describe('EjemplaresLibrosComponent', () => {
  let component: EjemplaresLibrosComponent;
  let fixture: ComponentFixture<EjemplaresLibrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EjemplaresLibrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EjemplaresLibrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
