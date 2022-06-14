import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurnosRoutingModule } from './turnos-routing.module';
import { TurnosComponent } from './turnos.component';
import { PedirTurnoComponent } from './pedir-turno/pedir-turno.component';
import { MisTurnosComponent } from './mis-turnos/mis-turnos.component';


@NgModule({
  declarations: [
    TurnosComponent,
    PedirTurnoComponent,
    MisTurnosComponent
  ],
  imports: [
    CommonModule,
    TurnosRoutingModule
  ]
})
export class TurnosModule { }
