import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotpassComponent } from './components/forgotpass/forgotpass.component';
import { AppRoutingModule } from './app.routing.module';
import { AuthService } from './services/auth.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    ForgotpassComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
