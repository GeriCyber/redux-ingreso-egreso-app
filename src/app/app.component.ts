import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ingreso-egreso-app';
  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.initAuthListener()
    .subscribe(
      () => {},
      (error) => console.error(error),
      () => {}
      );
  }

}
