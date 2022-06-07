import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Usuarios } from 'src/app/inerfaces/usuarios/usuarios';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-panel-principal',
  templateUrl: './panel-principal.component.html',
  styleUrls: ['./panel-principal.component.css']
})
export class PanelPrincipalComponent implements OnInit {
  nuevosMedicos !: boolean;
  
  constructor(private spinner: NgxSpinnerService, private userService : UsuariosService) { }

  ngOnInit(): void {
     /** spinner starts on init */
     this.spinner.show();
  
     setTimeout(() => {
       /** spinner ends after 5 seconds */
       this.spinner.hide();
     }, 1500);
     this.chequearNuevosMedicos();
  }

  chequearNuevosMedicos(){
    this.userService.traerUsuarios().subscribe(
      usuarios=>{
        (usuarios.filter(medico => medico.rol === "medico" && !medico.habilitado).length >0) ? this.nuevosMedicos=true : this.nuevosMedicos = false;
      }
    )
  }

}
