import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotpassComponent } from './components/forgotpass/forgotpass.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'register', component: SignupComponent },
  { path: 'forgotpass', component: ForgotpassComponent },
  { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
