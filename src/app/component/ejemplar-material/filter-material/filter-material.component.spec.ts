import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjemplarMaterialFilterMaterialComponent } from './filter-material.component';

describe('EjemplarMaterialFilterMaterialComponent', () => {
  let component: EjemplarMaterialFilterMaterialComponent;
  let fixture: ComponentFixture<EjemplarMaterialFilterMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EjemplarMaterialFilterMaterialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EjemplarMaterialFilterMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
