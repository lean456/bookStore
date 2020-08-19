import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators'
import { Observable } from 'rxjs/internal/Observable';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

public email:string = '';
public password: string = '';

uploadPercent: Observable<number>;
urlImage: Observable<string>;


  constructor(private authService:AuthService, private router: Router, private storage: AngularFireStorage) { }


  @ViewChild('imageUser') inputImageUser: ElementRef;


  ngOnInit(): void {
  }

  onUpload(parametro ){
    //console.log('subir imagen', parametro.target.files[0].name);
    const id = Math.random().toString(36).substring(2);
    const file = parametro.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL() ))
                          .subscribe();

  }

  onAddUser(){
    this.authService.registerUser(this.email,this.password)
    .then((res) => {

      this.authService.isAuth().subscribe(user => {
        if(user){
         
          user.updateProfile({
            displayName: '',
            photoURL: this.inputImageUser.nativeElement.value
          }).then( ()  => this.onLoginRedirect())
          .catch((error) =>  console.error('fail',error.message))
        }
      })
    }).catch(err => console.error('ERROR',err.message))
  }





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
  

  onLoginRedirect(){
    this.router.navigate(['admin/list-books'])
  }
}
