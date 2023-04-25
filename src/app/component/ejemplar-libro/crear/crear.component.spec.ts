import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjemplarLibroCrearComponent } from './crear.component';

describe('EjemplarLibroCrearComponent', () => {
  let component: EjemplarLibroCrearComponent;
  let fixture: ComponentFixture<EjemplarLibroCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EjemplarLibroCrearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EjemplarLibroCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
