import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MyModalComponent } from '../core/components/my-modal/my-modal.component';

export interface DialogData {
  name: string;
  color: string;
}


export interface TabItem {
  label: string;
  route: string;
}


@Component({
  selector: 'app-to-collect',
  templateUrl: './to-collect.component.html',
  styleUrls: ['./to-collect.component.sass']
})
export class ToCollectComponent implements OnInit {
  name: string='';
  color: string ='';
  title = 'AdminBelogIT';

  tabs: TabItem[] = [
    {
      label: 'viajes a facturar',
      route: '/tocollect/viajesfacturar',
    },
    {
      label: 'pre facturación',
      route: '/tocollect/prefactura',
    },
    {
      label: 'auditar viaje',
      route: '/tocollect/auditarviaje',
    },
    {
      label: 'aprobar prefactura',
      route: '/tocollect/aprobarprefactura',
    },
    {
      label: 'generar factura',
      route: '/tocollect/generarfactura',
    },
    {
      label: 'viajes a cobrar',
      route: '/tocollect/viajesacobrar',
    },
    {
      label: 'viajes cobrados',
      route: '/tocollect/viajescobrados',
    }
    
  ];

  constructor(public dialog: MatDialog) { }
  openDialog(): void {
    const dialogRef = this.dialog.open(MyModalComponent, {
      width: '1250px',
      data: { name: this.name, color: "paketetrajeee" }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.color = res;
    });
  }
  ngOnInit(): void {
  }

}
