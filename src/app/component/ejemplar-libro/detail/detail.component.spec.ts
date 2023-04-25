import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjemplarLibroDetailComponent } from './detail.component';

describe('EjemplarLibroDetailComponent', () => {
  let component: EjemplarLibroDetailComponent;
  let fixture: ComponentFixture<EjemplarLibroDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EjemplarLibroDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EjemplarLibroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
