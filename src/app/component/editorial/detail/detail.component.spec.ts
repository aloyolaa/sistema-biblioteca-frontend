import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorialDetailComponent } from './detail.component';

describe('EditorialDetailComponent', () => {
  let component: EditorialDetailComponent;
  let fixture: ComponentFixture<EditorialDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorialDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorialDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
