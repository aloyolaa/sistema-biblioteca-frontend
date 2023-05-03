import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamoMaterialFormComponent } from './form.component';

describe('PrestamoMaterialFormComponent', () => {
  let component: PrestamoMaterialFormComponent;
  let fixture: ComponentFixture<PrestamoMaterialFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestamoMaterialFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestamoMaterialFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
