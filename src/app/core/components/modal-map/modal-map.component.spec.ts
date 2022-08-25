import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMapComponent } from './modal-map.component';

describe('ModalConfirmComponent', () => {
  let component: ModalMapComponent;
  let fixture: ComponentFixture<ModalMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
