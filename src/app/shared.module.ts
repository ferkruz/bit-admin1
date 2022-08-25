import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from './app.material-module';

import { MapBasicComponent } from './core/components/map-basic/map-basic.component';
import { MapTripTracingComponent } from './core/components/map-trip-tracing/map-trip-tracing.component';

import { ModalConfirmComponent } from './core/components/modal-confirm/modal-confirm.component';

import { ChipPriority } from './core/directives/chip-priority/chip-priority.directive.ts.directive';
import { ModalMapComponent } from './core/components/modal-map/modal-map.component';
import { SelectWithFilterComponent } from './core/components/select-with-filter/select-with-filter.component';
import { StateImagePipe } from './core/pipes/priority-image/state-image.pipe';


const sharedModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  AppMaterialModule,
];

const sharedComponents = [
  MapBasicComponent,
  MapTripTracingComponent,
  ModalConfirmComponent,
  ModalMapComponent,
  StateImagePipe,
  ChipPriority,
  SelectWithFilterComponent,
];

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: []
})
export class SharedModule { }
