import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorDetailComponent } from './detail.component';

describe('AutorDetailComponent', () => {
  let component: AutorDetailComponent;
  let fixture: ComponentFixture<AutorDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
