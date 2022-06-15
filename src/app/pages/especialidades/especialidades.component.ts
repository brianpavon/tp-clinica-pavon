import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  formEspecialidad:FormGroup;
  especialidadNueva !: Especialidades;
  imgEspec !: File;
  urlImgEsp : string = '';
  
  constructor(private servEsp : EspecialidadesService, private imgServ : ImagenService, private fb : FormBuilder) {
    this.formEspecialidad = this.fb.group(
      {
        'descripcion':['',[Validators.required,Validators.minLength(5)]]
      }
    )
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

  async nuevaEspecialidad(){
    this.especialidadNueva = this.formEspecialidad.value;
    this.especialidadNueva.urlFoto = this.urlImgEsp;
    
    //console.log(this.especialidadNueva);
    this.servEsp.guardarEspecialidad(this.especialidadNueva);
    if(this.urlImgEsp != "") this.imgServ.guardarImagen(this.imgEspec,this.urlImgEsp);
    this.formEspecialidad.reset();    
    //@ts-ignore
    $('#altaEspecialidad').modal('hide')
  }

  cargarImagen(event : any){
    const fileImg : File = event.target.files[0];
    this.imgEspec = fileImg;      
    this.urlImgEsp = event.target.files[0].name;
  }  

}
