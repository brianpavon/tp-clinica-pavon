import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';
import { LoginComponent } from './pages/login/login.component';
import { PaginaErrorComponent } from './pages/pagina-error/pagina-error.component';
import { RegistroComponent } from './pages/registro/registro.component';


const routes: Routes = [
  {path:'home',component:BienvenidaComponent},
  {path:'login',component:LoginComponent},
  {path:'registro',component:RegistroComponent},
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'**',component:PaginaErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
