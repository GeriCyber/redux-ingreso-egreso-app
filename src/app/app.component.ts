import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { User, UserDto } from './auth/user.model';
import { Store } from '@ngrx/store';
import { Appstate } from './app.reducer';
import { SetUserAction } from './auth/auth.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ingreso-egreso-app';
  private userSubscription: Subscription = new Subscription();

  constructor(private auth: AuthService, private afDB: AngularFirestore, private store: Store<Appstate>) {}

  ngOnInit() {
    this.auth.initAuthListener()
    .subscribe(
      (fbUser) => {
        if (fbUser) {
          this.userSubscription =
            this.afDB.doc(`${fbUser.uid}/user`)
            .valueChanges()
            .subscribe((user: UserDto) => {
              const newUser = new User(user);
              this.store.dispatch(new SetUserAction(newUser));
            });
        } else {
          this.userSubscription.unsubscribe();
        }
      },
      (error) => console.error(error),
      () => {}
      );
  }

}
