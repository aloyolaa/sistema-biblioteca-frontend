import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamoMaterialDetailComponent } from './detail.component';

describe('PrestamoMaterialDetailComponent', () => {
  let component: PrestamoMaterialDetailComponent;
  let fixture: ComponentFixture<PrestamoMaterialDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestamoMaterialDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestamoMaterialDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
