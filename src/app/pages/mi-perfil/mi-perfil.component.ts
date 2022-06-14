import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/inerfaces/usuarios/usuarios';
import { AuthService } from 'src/app/services/auth.service';
import { ImagenService } from 'src/app/services/imagen.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  infoUsuario : Usuarios | undefined;
  urlImagen : string = '';
  urlSegundaImagen : string = "";
  constructor(private userServ : UsuariosService, private imgServ : ImagenService, private authServ : AuthService) {

   }

  ngOnInit(): void {
    console.log("Cargando usuarios");
    this.cargarInfoUsuario();
    
  }

  cargarInfoUsuario(){
    this.authServ.obtenerUsuarioLogueado().subscribe(
      async usuarioLogueado =>{
        //console.log(usuarioLogueado);
        this.infoUsuario = await this.userServ.devolverDataUsuarioDB(usuarioLogueado?.uid);
        //console.log(this.infoUsuario);
        this.imgServ.descargarImagen(this.infoUsuario?.fotoPerfil).subscribe(url =>{          
          this.urlImagen = url;
          //console.log(this.urlImagen);
        });
        if(this.infoUsuario?.rol == 'paciente'){
          this.imgServ.descargarImagen(this.infoUsuario?.fotoDos).subscribe(url =>{          
            this.urlSegundaImagen = url;
          });
        }
      }
    )
  }

}
