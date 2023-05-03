import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamoLibroDetailComponent } from './detail.component';

describe('PrestamoLibroDetailComponent', () => {
  let component: PrestamoLibroDetailComponent;
  let fixture: ComponentFixture<PrestamoLibroDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestamoLibroDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestamoLibroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
