import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(private router: Router)  {}

  registroUsuario(userdata): Promise<firebase.auth.UserCredential> {
    return firebase.auth().createUserWithEmailAndPassword(userdata.email, userdata.password);
  }

  inicioSesion(userdata): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(userdata.email, userdata.password);
  }

  inicioSesionWithGoogle(): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  isAuthenticated(): boolean {
    let authenticated: boolean;
    const user = firebase.auth().currentUser;
    if (user) {
      authenticated = true;
    } else {
      authenticated = false;
    }
    return authenticated;
  }

  logout():Promise<void> {
    return firebase.auth().signOut();
  }

}


