import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditarViajeComponent } from './auditar-viaje.component';

describe('AuditarViajeComponent', () => {
  let component: AuditarViajeComponent;
  let fixture: ComponentFixture<AuditarViajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditarViajeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditarViajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
