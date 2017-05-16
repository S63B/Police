import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StolenCarsComponent } from './stolen-cars.component';

describe('StolenCarsComponent', () => {
  let component: StolenCarsComponent;
  let fixture: ComponentFixture<StolenCarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StolenCarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StolenCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
