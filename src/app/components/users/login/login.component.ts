import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,private router: Router) {
  }

  public email: string = '';
  public password: string = '';








  onLoginGoogle() {
    this.authService.loginGoogleUser().then((res) => {
      console.log('respuesta usuario', res);
      this.onLoginRedirect();

    }).catch(err => console.error('ERROR',err.message))
  }

  onLoginGithub(){
    this.authService.loginGitHubUser().then((res) => {
      console.log('respuesta usuario', res);
      this.onLoginRedirect();

    }).catch(err => console.error('ERROR',err.message))
  }
   
  onLoginEmail(){
    this.authService.loginEmailUser(this.email,this.password)
        .then((res) => {
          this.onLoginRedirect();
        }).catch(err => console.error('ERROR', err.message))
  }
  

  logout() {
    this.authService.logoutUser();
  }

  ngOnInit(): void {
  }



  onLoginRedirect(){
    this.router.navigate(['admin/list-books'])
  }

}
