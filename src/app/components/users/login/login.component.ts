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







//Metodo de logeo por google, utuliza el service auth.service, y redirecciona a list-book
  onLoginGoogle() {
    this.authService.loginGoogleUser().then((res) => {
      console.log('respuesta usuario', res);
      this.onLoginRedirect();

    }).catch(err => console.error('ERROR',err.message))
  }
//Metodo de logeo por github, utuliza el service auth.service, y redirecciona a list-book
  onLoginGithub(){
    this.authService.loginGitHubUser().then((res) => {
      console.log('respuesta usuario', res);
      this.onLoginRedirect();

    }).catch(err => console.error('ERROR',err.message))
  }
   


  //Metodo de logeo por correo (CREE USUARIO POR FIREBASE), utuliza el service auth.service, y redirecciona a list-book
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
