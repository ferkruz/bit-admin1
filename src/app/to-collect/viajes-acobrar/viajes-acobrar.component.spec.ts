import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajesACobrarComponent } from './viajes-acobrar.component';

describe('ViajesACobrarComponent', () => {
  let component: ViajesACobrarComponent;
  let fixture: ComponentFixture<ViajesACobrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViajesACobrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViajesACobrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
