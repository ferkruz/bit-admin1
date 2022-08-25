import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LayoutService } from 'app/core/services/layout.service';
import { LoggedUserService } from 'app/core/services/logged-user.service';
import { MaterialModule } from 'app/material.module';
import { Tower } from 'app/models/tower.model';
import { TowerService } from 'app/services/tower.service';

@Component({
  selector: 'app-menu-select-tower',
  templateUrl: './menu-select-tower.component.html',
  styleUrls: ['./menu-select-tower.component.sass']
})
export class MenuSelectTowerComponent implements OnInit {
  public towers: Tower[] = [];
  public towerSelectedId: string = '';

  constructor(
    private _loggedUserService: LoggedUserService,
    private _layoutService: LayoutService,
    private _towerService: TowerService) { }

  ngOnInit(): void {
    this.load();
  }

  public load() {
    this._towerService.get().subscribe(res => {
      if (res != null && res.body != null) {
        if (res.body.result) {
          if (res.body.data && res.body.data.total > 0) {
            this.towers = res.body.data.towers;
            this.towerSelectedId = this.towers.reverse()[0].id
            this._loggedUserService.selectedTowerId.next(this.towerSelectedId);
          }
        } else {
          this._layoutService.setException(res);
        }
      }
    }, err => {
      this._layoutService.setException(err);
    });
  }

  onChange(event: any) {
    this._loggedUserService.selectedTowerId.next(event.value);
  }

}
