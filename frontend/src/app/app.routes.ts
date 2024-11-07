import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { UserlistComponent } from './userlist/userlist.component';
import { HttpClient } from '@angular/common/http';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
    {path:'login', component: LoginComponent},
    {path:'', redirectTo: 'home', pathMatch:'full'},
    {path:'register', component: RegisterComponent},
    {path: 'home', component: HomeComponent},
    {path: 'userlist', component: UserlistComponent, canActivate:[authGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  