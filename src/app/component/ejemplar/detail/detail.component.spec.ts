import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjemplarDetailComponent } from './detail.component';

describe('EjemplarDetailComponent', () => {
  let component: EjemplarDetailComponent;
  let fixture: ComponentFixture<EjemplarDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EjemplarDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EjemplarDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
