import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Usuarios } from '../inerfaces/usuarios/usuarios';
import { tap,first,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  itemsCollection !: AngularFirestoreCollection<Usuarios>;
  todosLosUsuarios !: Observable<Usuarios[]>;
  todosLosEspecialistas:Usuarios[] = [];
  constructor(private firestore:AngularFirestore) {

   }

   guardarUsuario(nuevoUsuario:Usuarios){
     //this.firestore.collection('usuarios').add(nuevoUsuario);
     this.firestore.collection('usuarios').doc(nuevoUsuario.id.toString()).set(nuevoUsuario,{merge:true});
   }

   traerUsuarios(){
     this.itemsCollection = this.firestore.collection<Usuarios>('usuarios');
     return this.todosLosUsuarios = this.itemsCollection.valueChanges();
   }

   devolverEspecialistas(){
      this.traerUsuarios().subscribe(
        usuarios=>{
          usuarios.forEach(usuario => {
            if(usuario.rol == "medico"){
              this.todosLosEspecialistas.push(usuario);
            }
          });
        }
      )
      return this.todosLosEspecialistas;
   }

  devolverUnUsuario(id:any){
    return  this.firestore.collection<Usuarios>('usuarios').doc(id).get();
  }

   actualizarUsuario(atributo: any, id: any){
    this.firestore.collection('usuarios').doc(id).set(atributo,{merge:true});
  }

  public async devolverDataUsuarioDB(id:string | undefined){
    return this.firestore
      .collection<Usuarios>('usuarios').doc(id)
      .valueChanges()
      .pipe(
        tap((data) => data),
        first()
      )
      .toPromise();
  }


}
