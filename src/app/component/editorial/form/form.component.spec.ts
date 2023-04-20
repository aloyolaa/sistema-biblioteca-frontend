import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorialFormComponent } from './form.component';

describe('EditorialFormComponent', () => {
  let component: EditorialFormComponent;
  let fixture: ComponentFixture<EditorialFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorialFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorialFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
