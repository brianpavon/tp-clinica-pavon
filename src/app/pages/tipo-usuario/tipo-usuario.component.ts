import { Component, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tipo-usuario',
  templateUrl: './tipo-usuario.component.html',
  styleUrls: ['./tipo-usuario.component.css']
})
export class TipoUsuarioComponent implements OnInit {
  @Output() tipoUsuario : EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  cargarTipoUsuario(usuario:string){
    this.tipoUsuario.emit(usuario);
  }

}
