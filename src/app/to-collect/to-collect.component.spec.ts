import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToCollectComponent } from './to-collect.component';


describe('ToCollectComponent', () => {
  let component: ToCollectComponent;
  let fixture: ComponentFixture<ToCollectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToCollectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToCollectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
