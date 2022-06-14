import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisTurnosComponent } from './mis-turnos/mis-turnos.component';
import { PedirTurnoComponent } from './pedir-turno/pedir-turno.component';
import { TurnosComponent } from './turnos.component';

const routes: Routes = [
  {path:'', component:TurnosComponent,
    children:[
      {path:'',component:MisTurnosComponent},
      {path:'pedir-turno',component:PedirTurnoComponent},
      {path:'mis-turnos',component:MisTurnosComponent},
      {path:'**',redirectTo:''}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurnosRoutingModule { }
