import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators'
import { auth } from 'firebase/app';
import { AngularFirestore,AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserInterface } from '../models/user';



AngularFirestore
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private afs: AngularFirestore) { }


  registerUser(email: string, password: string){
    return new Promise ((resolve ,reject) => {
      this.auth.createUserWithEmailAndPassword(email, password)
      .then(userData => {
        resolve(userData),
        this.updateUserData(userData.user)
      }).catch(err => console.log(reject(err)))
       
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
    return this.auth.signInWithPopup(new auth.GithubAuthProvider())
    .then((credential) =>  this.updateUserData(credential.user))
    
  }
  loginGoogleUser(){
    return this.auth.signInWithPopup(new auth.GoogleAuthProvider())
    .then((credential) =>  this.updateUserData(credential.user))
    
  }

  logoutUser(){
    return this.auth.signOut();
  }

  isAuth(){
    return this.auth.authState.pipe(map(auth => auth))
  }

  private updateUserData(user){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: UserInterface = {
      id: user.uid,
      email: user.email,
      roles:{
        editor: true
      }
    }
    return userRef.set(data, {merge:true})
  }



  isUserAdmin(userUid){
    return this.afs.doc<UserInterface>(`users/${userUid}`).valueChanges();
  }

}
