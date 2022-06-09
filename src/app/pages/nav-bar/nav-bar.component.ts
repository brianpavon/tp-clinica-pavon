import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  logged : boolean = false;
  esPaciente : boolean = false;
  esMedico : boolean = false;
  esAdmin : boolean = false;
  usuarioLogueado : any;
  usuarioDB : any;
  constructor(private auth:AngularFireAuth,private authServ:AuthService, private routes:Router, private userService : UsuariosService) { 
    this.auth.authState.subscribe(
      async user=>{
        if(!user) return;
        if(user?.email == 'admin@mail.com'){
          this.usuarioDB = await this.userService.devolverDataUsuarioDB("8yGBWwGoTDFeK3Ah14lG");
          this.usuarioLogueado = user.email;
          this.logged = true;
        }
        else if (user && user?.emailVerified && user?.email != 'admin@mail.com' ){
          this.usuarioDB = await this.userService.devolverDataUsuarioDB(user?.uid);
          this.usuarioLogueado = user.email;
          this.logged = true;
        }
        if(this.usuarioDB.rol == 'admin'){
          this.esAdmin = true;
        }
        else if(this.usuarioDB.rol == 'paciente'){
          this.esPaciente = true;
        }
        else if(this.usuarioDB.rol == 'medico'){
          this.esMedico = true;
        }
      }
    )

  }

  ngOnInit(): void {
  }

  desloguearse(){
    this.authServ.logout();
    this.logged = false;
    this.usuarioLogueado = '';
    this.usuarioDB = '';
    this.esPaciente = false;
    this.esMedico = false;
    this.esAdmin = false;
    //this.routes.navigate(['/home']);
  }
}
