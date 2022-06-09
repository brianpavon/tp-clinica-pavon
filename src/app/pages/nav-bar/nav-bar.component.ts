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
  usuarioLogueado : any;
  usuarioDB : any;
  constructor(private auth:AngularFireAuth,private authServ:AuthService, private routes:Router) { 
    this.auth.authState.subscribe(
      user=>{
        if(user && user?.emailVerified || user?.email == 'admin@mail.com'){
          
          this.usuarioLogueado = user.email;
          this.logged = true;
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
    //this.routes.navigate(['/home']);
  }
}
