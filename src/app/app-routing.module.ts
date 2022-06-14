import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { LoginComponent } from './pages/login/login.component';
import { MiPerfilComponent } from './pages/mi-perfil/mi-perfil.component';
import { PaginaErrorComponent } from './pages/pagina-error/pagina-error.component';
import { RegistroComponent } from './pages/registro/registro.component';


const routes: Routes = [
  {path:'home',component:BienvenidaComponent},
  {path:'login',component:LoginComponent},
  {path:'registro',component:RegistroComponent},
  {path:'mi-perfil',component:MiPerfilComponent},
  {path:'panel-control',loadChildren:()=> import('./pages/dashboard/dashboard.module').then( m => m.DashboardModule)},
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'**',component:PaginaErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
