import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators'
import { auth } from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }


  registerUser(){

  }

  loginEmailUser(){}

  loginFacebookUser(){}
  loginGoogleUser(){}

  logoutUser(){
    
  }

  isAuth(){
    return this.auth.authState.pipe(map(auth => auth))
  }

}
