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
  
  rol : string = "";  
  usuarioLogueado : any;
  usuarioDB : any;
  constructor(private auth:AngularFireAuth,private authServ:AuthService, private routes:Router, private userService : UsuariosService) { 
    this.auth.authState.subscribe(
      async user=>{
        if(!user) return;
        if(user?.email == 'admin@mail.com'){
          this.usuarioDB = await this.userService.devolverDataUsuarioDB("8yGBWwGoTDFeK3Ah14lG");
          this.usuarioLogueado = `${this.usuarioDB.nombre}  ${this.usuarioDB.apellido}`;
          this.rol = 'admin';          
        }
        else if (user && user?.emailVerified){
          this.usuarioDB = await this.userService.devolverDataUsuarioDB(user?.uid);
          //this.usuarioLogueado = user.email;
          this.usuarioLogueado = `${this.usuarioDB.nombre}  ${this.usuarioDB.apellido}`;
          //console.log(this.usuarioDB);
          
          this.rol = this.usuarioDB?.rol;          
        }
        
      }
    )

  }

  ngOnInit(): void {
  }

  desloguearse(){
    this.authServ.logout();    
    this.usuarioLogueado = '';
    this.usuarioDB = '';
    this.rol = '';    
  }
}
