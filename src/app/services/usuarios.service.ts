import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Usuarios } from '../inerfaces/usuarios/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  itemsCollection !: AngularFirestoreCollection<Usuarios>;
  todosLosUsuarios !: Observable<Usuarios[]>;
  
  constructor(private firestore:AngularFirestore) {

   }

   guardarUsuario(nuevoUsuario:Usuarios){
     this.firestore.collection('usuarios').add(nuevoUsuario);
   }

   traerUsuarios(){
     this.itemsCollection = this.firestore.collection<Usuarios>('usuarios');
     return this.todosLosUsuarios = this.itemsCollection.valueChanges();
   }
}
