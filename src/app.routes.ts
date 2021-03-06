
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './app/components/home/home.component';
import { OffersComponent } from './app/components/offers/offers.component';
import { DetailsBooksComponent } from './app/components/details-books/details-books.component';
import { ListBooksComponent } from './app/components/admin/list-books/list-books.component';
import { LoginComponent } from './app/components/users/login/login.component';
import { RegisterComponent } from './app/components/users/register/register.component';
import { ProfileComponent } from './app/components/users/profile/profile.component';
import { Page404Component } from './app/components/users/page404/page404.component';
import { AuthGuard } from './app/guards/auth.guard';

 const APP_ROUTES: Routes = [
     {path: '',component: HomeComponent },
     {path: 'offers', component: OffersComponent, canActivate:[AuthGuard]},
     {path: 'book/:id', component:DetailsBooksComponent},
     {path: 'admin/list-books', component: ListBooksComponent, canActivate:[AuthGuard]},
     {path: 'user/login', component: LoginComponent},
     {path: 'user/register', component: RegisterComponent},
     {path: 'user/profile', component: ProfileComponent, canActivate:[AuthGuard]},
     {path: '**', component: Page404Component}
    ]



export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES)