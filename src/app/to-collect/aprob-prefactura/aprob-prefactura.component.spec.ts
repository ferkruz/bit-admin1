import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AprobPrefacturaComponent } from './aprob-prefactura.component';

describe('AprobPrefacturaComponent', () => {
  let component: AprobPrefacturaComponent;
  let fixture: ComponentFixture<AprobPrefacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AprobPrefacturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobPrefacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
