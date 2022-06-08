import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/inerfaces/usuarios/usuarios';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'dni', 'email', 'edad','obraSocial','estado'];
  todosLosPacientes : Usuarios[] = []
  constructor(private userServ:UsuariosService) { }

  ngOnInit(): void {
    this.cargarPacientes();
  }

  cargarPacientes(){
    this.userServ.traerUsuarios().subscribe(
      usuarios=>{
        this.todosLosPacientes = usuarios;
        this.todosLosPacientes = this.todosLosPacientes.filter(paciente => paciente.rol === 'paciente');
      }
    )
  }

  cambiarEstados(event:any,id:any){
    //console.log(event.source.name);
    let atributo = event.source.name;
    let valor = event.checked;
    const data = {   
      [atributo]: valor
  
    };
    //console.log(data);
    this.userServ.actualizarUsuario(data,id);
  }
 

}
