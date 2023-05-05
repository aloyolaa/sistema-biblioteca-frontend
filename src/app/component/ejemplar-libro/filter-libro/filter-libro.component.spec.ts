import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjemplarLibroFilterLibroComponent } from './filter-libro.component';

describe('EjemplarLibroFilterLibroComponent', () => {
  let component: EjemplarLibroFilterLibroComponent;
  let fixture: ComponentFixture<EjemplarLibroFilterLibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EjemplarLibroFilterLibroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EjemplarLibroFilterLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
