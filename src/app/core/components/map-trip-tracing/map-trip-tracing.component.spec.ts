import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapTripTracingComponent } from './map-trip-tracing.component';

describe('MapTripTracingComponent', () => {
  let component: MapTripTracingComponent;
  let fixture: ComponentFixture<MapTripTracingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapTripTracingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapTripTracingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
