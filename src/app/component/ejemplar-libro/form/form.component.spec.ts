import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjemplarLibroFormComponent } from './form.component';

describe('EjemplarLibroFormComponent', () => {
  let component: EjemplarLibroFormComponent;
  let fixture: ComponentFixture<EjemplarLibroFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EjemplarLibroFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EjemplarLibroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
