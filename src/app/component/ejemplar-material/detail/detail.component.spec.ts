import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjemplarMaterialDetailComponent } from './detail.component';

describe('EjemplarMaterialDetailComponent', () => {
  let component: EjemplarMaterialDetailComponent;
  let fixture: ComponentFixture<EjemplarMaterialDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EjemplarMaterialDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EjemplarMaterialDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
