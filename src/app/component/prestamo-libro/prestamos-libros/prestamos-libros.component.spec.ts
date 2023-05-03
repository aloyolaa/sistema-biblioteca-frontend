import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamosLibrosComponent } from './prestamos-libros.component';

describe('PrestamosLibrosComponent', () => {
  let component: PrestamosLibrosComponent;
  let fixture: ComponentFixture<PrestamosLibrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestamosLibrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestamosLibrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
