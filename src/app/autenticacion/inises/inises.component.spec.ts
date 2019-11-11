import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InisesComponent } from './inises.component';

describe('InisesComponent', () => {
  let component: InisesComponent;
  let fixture: ComponentFixture<InisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InisesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
