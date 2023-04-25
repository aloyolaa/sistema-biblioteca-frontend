import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjemplarMaterialCrearComponent } from './crear.component';

describe('EjemplarMaterialCrearComponent', () => {
  let component: EjemplarMaterialCrearComponent;
  let fixture: ComponentFixture<EjemplarMaterialCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EjemplarMaterialCrearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EjemplarMaterialCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
