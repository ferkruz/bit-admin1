import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajesfacturarComponent } from './viajesfacturar.component';

describe('ViajesfacturarComponent', () => {
  let component: ViajesfacturarComponent;
  let fixture: ComponentFixture<ViajesfacturarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViajesfacturarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViajesfacturarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
