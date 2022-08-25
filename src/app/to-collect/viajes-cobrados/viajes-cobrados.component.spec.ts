import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajesCobradosComponent } from './viajes-cobrados.component';

describe('ViajesCobradosComponent', () => {
  let component: ViajesCobradosComponent;
  let fixture: ComponentFixture<ViajesCobradosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViajesCobradosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViajesCobradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
