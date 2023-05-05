import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialFilterAreaComponent } from './filter-area.component';

describe('MaterialFilterAreaComponent', () => {
  let component: MaterialFilterAreaComponent;
  let fixture: ComponentFixture<MaterialFilterAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialFilterAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialFilterAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
