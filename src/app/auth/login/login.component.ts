import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  message = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(data: any) {
    console.log(data);
    this.authService.login(data.email, data.password)
    .then((user) => {
      this.router.navigate(['/']);
    })
    .catch((error) => {
      Swal.fire('Usuario o contraseña inválida', error.message, 'error');
    });
  }

}
