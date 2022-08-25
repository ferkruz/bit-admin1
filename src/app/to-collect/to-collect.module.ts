import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ToCollectRoutingModule } from './to-collect-routing.module';
import { ViajesfacturarComponent } from './viajesfacturar/viajesfacturar.component';
import { PrefacturaComponent } from './prefactura/prefactura.component';
import { AuditarViajeComponent } from './auditar-viaje/auditar-viaje.component';
import { AprobPrefacturaComponent } from './aprob-prefactura/aprob-prefactura.component';
import { GenerarFacturaComponent } from './generar-factura/generar-factura.component';
import { ViajesCobradosComponent } from './viajes-cobrados/viajes-cobrados.component';
import { ViajesACobrarComponent } from './viajes-acobrar/viajes-acobrar.component';

import { NetworkInterceptor } from './viajesfacturar/service/network.interceptor'

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MatTableModule } from '@angular/material/table' ;
import { MatSortModule } from '@angular/material/sort'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule }  from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';


import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppMaterialModule } from '../app.material-module';

@NgModule({
  declarations: [
    ViajesfacturarComponent,
    PrefacturaComponent,
    AuditarViajeComponent,
    AprobPrefacturaComponent,
    GenerarFacturaComponent,
    ViajesCobradosComponent,
    ViajesACobrarComponent
  ],
  imports: [
    CommonModule,
    ToCollectRoutingModule,
    HttpClientModule,

    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,    
    MatPaginatorModule,
    MatCardModule,
    MatProgressSpinnerModule,
    AppMaterialModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NetworkInterceptor,
      multi: true,
    },
 ],
})
export class ToCollectModule { }
