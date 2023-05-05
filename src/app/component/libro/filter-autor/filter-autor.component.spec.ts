import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroFilterAutorComponent } from './filter-autor.component';

describe('LibroFilterAutorComponent', () => {
  let component: LibroFilterAutorComponent;
  let fixture: ComponentFixture<LibroFilterAutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibroFilterAutorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibroFilterAutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
