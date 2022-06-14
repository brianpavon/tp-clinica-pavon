import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Turnos } from '../interfaces/turnos';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {
  itemsCollection !: AngularFirestoreCollection<Turnos>;
  todosLosTurnos !: Observable<Turnos[]>;
  
  constructor(private firestore : AngularFirestore) {

  }

  guardarTurno(nuevoTurno : Turnos){
    this.firestore.collection('turnos').add(nuevoTurno);
  }

  traerTodosLosTurnos(){
    this.itemsCollection = this.firestore.collection<Turnos>('turnos');
    return this.todosLosTurnos = this.itemsCollection.valueChanges();
  }

}
