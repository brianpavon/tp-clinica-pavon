import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService { 
  toast;
  userFirebase : any;
  constructor(private auth:AngularFireAuth,private router:Router) { 
    auth.authState.subscribe(user=>{
      //console.log(user);
    });
    this.toast= Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
  }

  //Funciones
  login(email:string, password:string){
    return this.auth.signInWithEmailAndPassword(email,password).then(
      e=>{
        if(e.user?.email == 'admin@mail.com'){
          this.router.navigate(['/panel-control']);
          setTimeout(() => {
            this.loginExitoso('Bienvenido nuevamente!');        
          }, 2000);
        }else if(e.user?.emailVerified){
          this.router.navigate(['/home']);
          setTimeout(() => {
            this.loginExitoso('Bienvenido nuevamente!');        
          }, 2000);
        }else{
          this.enviarMailParaVerificar();
          this.cuentaNoVerificada();
        }
      }
    );
  }

  register(email: string, password: string){
    return this.auth.createUserWithEmailAndPassword(email,password).then(
      e=>{
        this.userFirebase = e.user;
        this.enviarMailParaVerificar();
      }
    );
  }  
  
  logout(){
    return this.auth.signOut();
  }

  //Funcion que lanzara los diferentes mensajes de error en el login
  thrownErrorsLogin(type:any){
    switch (type) {
      case 'auth/invalid-email':
        Swal.fire({
          title: 'El email ingresado no es v&aacute;lido',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
        });
        break;
      case 'auth/user-disabled':
        Swal.fire({
          title: 'Contacte al administrador su email fue dado de baja',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
        });
        break;
      case 'auth/user-not-found':
        Swal.fire({
          title:'Su email no corresponde con ning&uacute;n usuario registrado',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
        });
        break;
      case 'auth/wrong-password':
        Swal.fire({
          title: 'La contraseña no es v&aacute;lida para este mail',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
        });
        break;

      default:
        Swal.fire({
          title: 'Ocurri&oacute; un error al intentar ingresar.',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
        });
        break;
    }
  }

  authSuccess(message:string){
    this.toast.fire({
      title: message,
      icon: 'success', 
    })
    this.router.navigate(['/home']);
  }

  loginExitoso(message:string){
    this.toast.fire({
      title: message,
      icon: 'success', 
    })    
  }

  cuentaNoVerificada(){
    Swal.fire({
      title: 'Para ingresar debe validar su mail. Verifique su correo (puede llegar a SPAM).',
      icon: 'error',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar',
    });
  }
  //Funcion que lanzara los diferentes mensajes de error en el login
  thrownErrorsRegister(type:any){
    switch (type) {
      case 'auth/email-already-in-use':
        Swal.fire({
          title: 'El email ingresado ya se encuentra registrado',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar',
        });
        break;
      case 'auth/invalid-email':
        Swal.fire({
          title: 'El email ingresado no es v&aacute;lido o est&aacute; vac&iacute;o',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
        });
        break;
      case 'auth/operation-not-allowed':
        Swal.fire({
          title:'Ha ocurrido un error con el registro, contacte al administrador.',
          text:'Contacte a este mail: admin@yateayudo.com',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
        });
        break;
      case 'auth/weak-password':
        Swal.fire({
          title: 'Contraseña insegura',
          text: 'Ingrese una contraseña que tenga 1 mayúscula, 8 caracteres mínimo y un caracter especial',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
        });
        break;

      default:
        Swal.fire({
          title: 'Ocurrió un error en el registro.',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
        });
        break;
    }
  }

  obtenerUsuarioLogueado(){
    return this.auth.authState
  }

  enviarMailParaVerificar(){
    return this.auth.currentUser.then(
      user=>{
        return user?.sendEmailVerification();
      }
    )
  }

  
}
