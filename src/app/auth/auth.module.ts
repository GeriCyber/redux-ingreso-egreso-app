import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularFireAuthModule,
    RouterModule
  ]
})
export class AuthModule { }
