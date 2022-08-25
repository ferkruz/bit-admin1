import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapAutocompleteComponent } from './map-autocomplete.component';

describe('MapAutocompleteComponent', () => {
  let component: MapAutocompleteComponent;
  let fixture: ComponentFixture<MapAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapAutocompleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
