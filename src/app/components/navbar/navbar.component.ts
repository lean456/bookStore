import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  public app_name:string = 'BookStore';
  public isLogged: boolean = false;

  constructor(private authService: AuthService,private auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.getCurrentUser()
  }



  getCurrentUser(){
    this.authService.isAuth().subscribe( data => {
      if(data){
        console.log('User logged');
        this.isLogged = true;
      } else {
        console.log('User NOT logged');
        this.isLogged = false;
      }
    } )
  }


  logout() {
    this.auth.signOut();
  }

}
