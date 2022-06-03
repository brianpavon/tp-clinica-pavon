import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { EspecialistasComponent } from './especialistas/especialistas.component';
import { PanelPrincipalComponent } from './panel-principal/panel-principal.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  {path:'',component:DashboardComponent,
    children:[
      {path:'',component:PanelPrincipalComponent},
      {path:'usuarios',component:UsuariosComponent},
      {path:'especialistas',component:EspecialistasComponent},
      {path:'**',redirectTo:''}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
