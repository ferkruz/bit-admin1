import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViajesfacturarComponent } from './viajesfacturar/viajesfacturar.component';
import { PrefacturaComponent } from './prefactura/prefactura.component';
import { AuditarViajeComponent } from './auditar-viaje/auditar-viaje.component';
import { AprobPrefacturaComponent } from './aprob-prefactura/aprob-prefactura.component';
import { GenerarFacturaComponent } from './generar-factura/generar-factura.component';
import { ViajesCobradosComponent } from './viajes-cobrados/viajes-cobrados.component';
import { ViajesACobrarComponent } from './viajes-acobrar/viajes-acobrar.component';

const routes: Routes = [
  {
    path: 'viajesfacturar',
    component: ViajesfacturarComponent
  },
  {
    path: 'prefactura',
    component: PrefacturaComponent
  },  
  {
    path: 'auditarviaje',
    component: AuditarViajeComponent
  },
  {
    path: 'aprobarprefactura',
    component: AprobPrefacturaComponent
  },
  {
    path: 'generarfactura',
    component: GenerarFacturaComponent
  },
  {
    path: 'viajescobrados',
    component: ViajesCobradosComponent
  }, 
  {
    path: 'viajesacobrar',
    component: ViajesACobrarComponent
  },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToCollectRoutingModule { }
