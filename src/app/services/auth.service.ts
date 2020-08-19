import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators'
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }


  registerUser(email: string, password: string){
    return new Promise ((resolve ,reject) => {
      this.auth.createUserWithEmailAndPassword(email, password)
      .then(userData => resolve(userData),
          err => reject(err));
    })
  }

  loginEmailUser(email: string, password:string){

    return new Promise((resolve, reject) => {
      this.auth.signInWithEmailAndPassword(email, password)
          .then(userData => resolve(userData),
          err => reject(err));
    })

  }

  loginGitHubUser(){
    return this.auth.signInWithPopup(new auth.GithubAuthProvider());
    
  }
  loginGoogleUser(){
    return this.auth.signInWithPopup(new auth.GoogleAuthProvider());
    
  }

  logoutUser(){
    return this.auth.signOut();
  }

  isAuth(){
    return this.auth.authState.pipe(map(auth => auth))
  }

}
