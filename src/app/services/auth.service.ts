import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isUserLoggednIn: boolean = false;
  constructor(public db: AngularFireDatabase, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(auth => {
      if (auth != null) {
        this.isUserLoggednIn = true;
      } else {
        this.isUserLoggednIn = false;
      }
    });
  }

  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }

  sendToken(token: string) {
    localStorage.setItem('UserToken', token);
  }

  getToken() {
    return localStorage.getItem('UserToken') != null
      ? JSON.parse(localStorage.getItem('UserToken'))['stsTokenManager'][
          'refreshToken'
        ]
      : null;
  }

  isLoggednIn() {
    return this.getCurrentUser().then(
      user => {
        if (user.refreshToken != this.getToken()) {
          this.sendToken(JSON.stringify(user));
          return true;
        } else {
          return true;
        }
      },
      err => {
        return false;
      }
    );
  }

  logout() {
    this.afAuth.auth.signOut();
    localStorage.removeItem('UserToken');
    this.isUserLoggednIn = false;
  }

  loginWithGoogle() {
    return this.afAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }
  loginWithFacebook() {
    return this.afAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    );
  }
  loginWithEmail(email: string, pass: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, pass);
  }
  loginWithTwitter() {
    return this.afAuth.auth.signInWithPopup(
      new firebase.auth.TwitterAuthProvider()
    );
  }
  signupWithEmailAndPass(email: string, pass: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, pass);
  }
}
