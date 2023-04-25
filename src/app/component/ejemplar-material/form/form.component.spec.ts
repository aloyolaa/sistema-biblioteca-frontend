import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjemplarMaterialFormComponent } from './form.component';

describe('EjemplarMaterialFormComponent', () => {
  let component: EjemplarMaterialFormComponent;
  let fixture: ComponentFixture<EjemplarMaterialFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EjemplarMaterialFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EjemplarMaterialFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
