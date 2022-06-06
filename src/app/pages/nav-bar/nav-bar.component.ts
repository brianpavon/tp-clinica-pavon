import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  usuarioLogueado = this.authServ.obtenerUsuarioLogueado();
  constructor(private authServ:AuthService) { 

  }

  ngOnInit(): void {    
  }

}
