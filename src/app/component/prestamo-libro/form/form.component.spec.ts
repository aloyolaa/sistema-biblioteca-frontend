import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamoLibroFormComponent } from './form.component';

describe('PrestamoLibroFormComponent', () => {
  let component: PrestamoLibroFormComponent;
  let fixture: ComponentFixture<PrestamoLibroFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestamoLibroFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestamoLibroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
