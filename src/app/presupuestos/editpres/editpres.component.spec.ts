import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpresComponent } from './editpres.component';

describe('EditpresComponent', () => {
  let component: EditpresComponent;
  let fixture: ComponentFixture<EditpresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditpresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
