import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Usuarios } from 'src/app/inerfaces/usuarios/usuarios';
import { AuthService } from 'src/app/services/auth.service';
import { ImagenService } from 'src/app/services/imagen.service';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  tipoUsuario:string = '';  
  formRegistro:FormGroup;
  nuevoUsuario !: Usuarios;
  fotoPerfil !: File;
  segundaFoto !:File;
  pathFotoPerfil : string = '';
  pathSegundaFoto : string = '';  
 
  constructor( private fb:FormBuilder, private spinner: NgxSpinnerService, private usuarioServ : UsuariosService, private imgServ : ImagenService,private auth : AuthService) { 
    
    this.formRegistro = this.fb.group(
      {
        'nombre':['',[Validators.required,Validators.minLength(2)]],
        'apellido':['',[Validators.required,Validators.minLength(2)]],
        'edad':['',[Validators.required,Validators.min(1),Validators.max(120)]],
        'dni':['',[Validators.required,Validators.minLength(6)]],
        'email': ['',[Validators.required,Validators.email]],
        'clave':['',[Validators.required,Validators.minLength(6)]],
        //'rol': ['',[Validators.required]],
        'obraSocial': ['',[Validators.required,Validators.minLength(3)]],
        'especialidad' : ['',[Validators.required]],
        'fotoDos' : ['',[Validators.required]],
        'fotoPerfil' : ['',[Validators.required]],
        'captcha' : [null,Validators.required]
      }
    );
  } 
  
  ngOnInit(): void {

    /** spinner starts on init */
    this.spinner.show();
  
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1500);    
  }

  async crearUsuario(){
    //console.log(this.formRegistro.value);
    delete this.formRegistro.value.segundaImagen;
    delete this.formRegistro.value.fotoPerfil;
    delete this.formRegistro.value.captcha;
    this.nuevoUsuario = this.formRegistro.value;
    this.nuevoUsuario.rol = this.tipoUsuario;
    //console.log(this.nuevoUsuario);
    
    this.tipoUsuario == 'paciente' ? delete this.nuevoUsuario.especialidad : delete this.nuevoUsuario.obraSocial;
    if(this.tipoUsuario == 'admin'){      
      delete this.nuevoUsuario.especialidad;
    }
    this.nuevoUsuario.fotoPerfil = this.pathFotoPerfil;
    this.nuevoUsuario.fotoDos = (this.tipoUsuario == 'paciente') ? this.pathSegundaFoto : "";
    try {
      await this.auth.register(this.nuevoUsuario.email,this.nuevoUsuario.clave);      
      this.nuevoUsuario.id = this.auth.userFirebase.uid;
      //console.log(this.auth.userFirebase.uid);
      
      if(this.tipoUsuario == 'paciente'){
        delete this.nuevoUsuario.habilitado;
        this.imgServ.guardarImagen(this.fotoPerfil,this.pathFotoPerfil);
        this.imgServ.guardarImagen(this.segundaFoto,this.pathSegundaFoto);
      }else{
        this.imgServ.guardarImagen(this.fotoPerfil,this.pathFotoPerfil);
        this.nuevoUsuario.habilitado = false;
      }
      //console.log(this.nuevoUsuario);
      this.nuevoUsuario.estado = true;      
      this.usuarioServ.guardarUsuario(this.nuevoUsuario);
      this.formRegistro.reset();
      this.auth.authSuccess('Registro exitoso! No olvide verificar su email.');
    } catch (error : any) {
      //console.log(error);
      this.auth.thrownErrorsRegister(error.code);
    }
   
  }

  eligeTipoUsuario(){
    //console.log(this.tipoUsuario);
    if(this.tipoUsuario == 'paciente'){
      this.formRegistro.get('obraSocial')?.setValidators([Validators.required]);
      this.formRegistro.get('obraSocial')?.updateValueAndValidity();

      this.formRegistro.get('especialidad')?.clearValidators();
      this.formRegistro.get('especialidad')?.updateValueAndValidity();

      this.formRegistro.get('fotoDos')?.setValidators([Validators.required]);
      this.formRegistro.get('fotoDos')?.updateValueAndValidity();

      //faltaria la 2da imagen
    }else if(this.tipoUsuario == 'medico'){
      //console.log(this.tipoUsuario);
      
      this.formRegistro.get('especialidad')?.setValidators([Validators.required]);
      this.formRegistro.get('especialidad')?.updateValueAndValidity();

      this.formRegistro.get('obraSocial')?.clearValidators();
      this.formRegistro.get('obraSocial')?.updateValueAndValidity();

      this.formRegistro.get('fotoDos')?.clearValidators();
      this.formRegistro.get('fotoDos')?.updateValueAndValidity();
    }
    else if(this.tipoUsuario == 'admin'){
      //console.log(this.tipoUsuario);
      
      this.formRegistro.get('especialidad')?.clearValidators();
      this.formRegistro.get('especialidad')?.updateValueAndValidity();

      this.formRegistro.get('obraSocial')?.clearValidators();
      this.formRegistro.get('obraSocial')?.updateValueAndValidity();

      this.formRegistro.get('fotoDos')?.clearValidators();
      this.formRegistro.get('fotoDos')?.updateValueAndValidity();
    }
    
  }

  guardarImagen(event:any){
    if(event.target.name == 'fotoPerfil'){
      const filePerfil : File = event.target.files[0];
      this.fotoPerfil = filePerfil;      
      this.pathFotoPerfil = event.target.files[0].name;
      //console.log(this.pathFotoPerfil);
        
    }
    else if(event.target.name == 'fotoDos'){
      const fileDos : File = event.target.files[0];
      this.segundaFoto = fileDos;      
      this.pathSegundaFoto = event.target.files[0].name;  
      //console.log(this.pathSegundaFoto);
    }
  }

  cargarUsuario(usuario:string){
    this.tipoUsuario = usuario;
    this.eligeTipoUsuario();
  }

  cambiarUsuario(){
    this.tipoUsuario = '' ;
    this.formRegistro.reset();
  }

}
