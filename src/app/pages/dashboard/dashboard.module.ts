import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { DashboardComponent } from './dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { EspecialistasComponent } from './especialistas/especialistas.component';
import { PanelPrincipalComponent } from './panel-principal/panel-principal.component';


@NgModule({
  declarations: [
    DashboardComponent,
    UsuariosComponent,
    EspecialistasComponent,
    PanelPrincipalComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule
  ]
})
export class DashboardModule { }
