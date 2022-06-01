import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  tipoUsuario:string = ''
  formRegistro:FormGroup;
  constructor(private fb:FormBuilder, private spinner: NgxSpinnerService) { 
    this.formRegistro = this.fb.group(
      {
        'nombre':['',[Validators.required,Validators.minLength(2)]],
        'apellido':['',[Validators.required,Validators.minLength(2)]],
        'edad':['',Validators.required,Validators.min(1)],
        'dni':['',Validators.required,Validators.minLength(6)],
        'email': ['',Validators.required,Validators.email],
        'clave':['',Validators.required,Validators.minLength(6)]                
      }
    )
  } 
  
  ngOnInit(): void {
    /** spinner starts on init */
    this.spinner.show();
  
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1500);
  }

  nuevoUsuario(){
    console.log(this.formRegistro.value);
    
  }

  eligeTipoUsuario(){
    //console.log(this.tipoUsuario);
    if(this.tipoUsuario == 'paciente'){

    }else{

    }
    
  }

}
