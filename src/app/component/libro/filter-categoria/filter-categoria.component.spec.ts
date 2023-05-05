import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroFilterCategoriaComponent } from './filter-categoria.component';

describe('LibroFilterCategoriaComponent', () => {
  let component: LibroFilterCategoriaComponent;
  let fixture: ComponentFixture<LibroFilterCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibroFilterCategoriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibroFilterCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
