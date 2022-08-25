import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IModalConfirm } from 'app/core/interfaces/modalConfirm.interface';
import { IModalMap } from 'app/core/interfaces/modalMap.interface';
import { ModalConfirm } from 'app/core/models/modalConfirm.model';
import { ModalMap } from 'app/core/models/modalMap.model';
import { LayoutService } from 'app/core/services/layout.service';
import { TowerService } from 'app/services/tower.service';

@Component({
  selector: 'app-modal-map',
  templateUrl: './modal-map.component.html',
  styleUrls: ['./modal-map.component.sass']
})
export class ModalMapComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ModalMapComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IModalMap = new ModalMap()) {
  }

  ngOnInit(): void { }
}
