import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../user.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private afDB: AngularFirestore) { }

  ngOnInit() {
  }

  onSubmit(data: any) {
    this.authService.crearUsuario(data.email, data.password, data.name)
    .then((userFirebase) => {
      const user: User = {
        uid: userFirebase.user.uid,
        name: data.name,
        email: data.email
      };
      this.afDB.doc(`${user.uid}/user`).set(user)
      .then(() => this.router.navigate(['/']))
      .catch((error) => {
        Swal.fire('Hubó un error al crear el usuario en nuestro sistema', error.message, 'error');
      });
    })
    .catch((error) => {
      Swal.fire('Hubó un error al registrarse', error.message, 'error');
    });
  }

}
