import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjemplarCrearComponent } from './crear.component';

describe('EjemplarCrearComponent', () => {
  let component: EjemplarCrearComponent;
  let fixture: ComponentFixture<EjemplarCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EjemplarCrearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EjemplarCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
