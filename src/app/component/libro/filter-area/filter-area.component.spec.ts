import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroFilterAreaComponent } from './filter-area.component';

describe('LibroFilterAreaComponent', () => {
  let component: LibroFilterAreaComponent;
  let fixture: ComponentFixture<LibroFilterAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibroFilterAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibroFilterAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
