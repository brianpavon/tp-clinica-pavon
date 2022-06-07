import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Usuarios } from 'src/app/inerfaces/usuarios/usuarios';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuarioVerificado : boolean = false;
  esAdmin : boolean = false;
  constructor(private spinner: NgxSpinnerService,private auth :AuthService,private routes : Router) {
  }
  
  ngOnInit(): void {
    /** spinner starts on init */
    this.spinner.show();
  
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1500);
  }

  redirectToHome() {
    this.routes.navigate(['/home']);    
  }

  async login(email: string, password: string) {
    try {
      
      await this.auth.login(email, password);
      
    } catch (error: any) {
      this.auth.thrownErrorsLogin(error.code);
    }
  }

}
