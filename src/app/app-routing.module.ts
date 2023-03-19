import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './componets/not-found/not-found.component';
import { ProfileComponent } from './componets/profile/profile.component';
import { SignInComponent } from './componets/sign-in/sign-in.component';
import { SignUpComponent } from './componets/sign-up/sign-up.component';
import { AuthGuard } from './Guards/auth.guard';

const routes: Routes = [
  {path:"", redirectTo:"signup", pathMatch:"full"},
  {path:"signin", component:SignInComponent},
  {path:"signup", component:SignUpComponent},
  {path:"profile",canActivate:[AuthGuard], component:ProfileComponent},
  {path:"**", component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
