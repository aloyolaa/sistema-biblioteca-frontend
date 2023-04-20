import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjemplarFormComponent } from './form.component';

describe('EjemplarFormComponent', () => {
  let component: EjemplarFormComponent;
  let fixture: ComponentFixture<EjemplarFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EjemplarFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EjemplarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
