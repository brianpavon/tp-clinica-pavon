import { Component, OnInit } from '@angular/core';
import { Especialidades } from 'src/app/interfaces/especialidades';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.css']
})
export class EspecialidadesComponent implements OnInit {
  listaEspecialidades : Especialidades[] = [];
  
  constructor(private servEsp : EspecialidadesService, private imgServ : ImagenService) {

  }

  ngOnInit(): void {
    this.cargarEspecialidades();
  }

  cargarEspecialidades(){
    this.servEsp.traerTodasLasEspecialidades().subscribe(
      esp => {
        this.listaEspecialidades = esp;
        this.listaEspecialidades.forEach(element => {
          element.urlFoto != '' ? element.urlFoto = element.urlFoto : element.urlFoto = 'medicine.png'          
          this.imgServ.descargarImagen(element.urlFoto).subscribe(
            url => {
              element.urlFoto = url;
            }
          )
          
        });
      }
    )
  }

}
