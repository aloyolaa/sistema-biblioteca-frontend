import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroFilterComponent } from './filter.component';

describe('LibroFilterComponent', () => {
  let component: LibroFilterComponent;
  let fixture: ComponentFixture<LibroFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibroFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibroFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
