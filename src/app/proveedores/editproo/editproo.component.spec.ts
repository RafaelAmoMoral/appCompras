import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprooComponent } from './editproo.component';

describe('EditprooComponent', () => {
  let component: EditprooComponent;
  let fixture: ComponentFixture<EditprooComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditprooComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditprooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
