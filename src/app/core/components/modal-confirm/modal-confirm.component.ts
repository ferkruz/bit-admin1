import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IModalConfirm } from 'app/core/interfaces/modalConfirm.interface';
import { ModalConfirm } from 'app/core/models/modalConfirm.model';
import { LayoutService } from 'app/core/services/layout.service';
import { TowerService } from 'app/services/tower.service';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.sass']
})
export class ModalConfirmComponent implements OnInit {
  private towerId: string;

  constructor(
    private _layoutService: LayoutService,
    private _towerService: TowerService,
    public dialogRef: MatDialogRef<ModalConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IModalConfirm = new ModalConfirm()) {
    this.towerId = data.params.id;
  }

  ngOnInit(): void { }

  public btnOneClick(): void {
    this.dialogRef.close({ press: 'button1' });
  }

  public btnTwoClick(): void {
    this.dialogRef.close({ press: 'button2'});
  }
}
