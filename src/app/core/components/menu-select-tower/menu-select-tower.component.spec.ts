import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSelectTowerComponent } from './menu-select-tower.component';

describe('MenuSelectTowerComponent', () => {
  let component: MenuSelectTowerComponent;
  let fixture: ComponentFixture<MenuSelectTowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuSelectTowerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuSelectTowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
