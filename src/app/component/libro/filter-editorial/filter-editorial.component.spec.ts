import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroFilterEditorialComponent } from './filter-editorial.component';

describe('LibroFilterEditorialComponent', () => {
  let component: LibroFilterEditorialComponent;
  let fixture: ComponentFixture<LibroFilterEditorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibroFilterEditorialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibroFilterEditorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
