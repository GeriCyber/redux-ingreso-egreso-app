import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {

  user: User;
  subs: Subscription = new Subscription();

  constructor(private authService: AuthService) { }

  ngOnInit() {
    setTimeout(() => {
      this.user = this.authService.getUser();
    }, 800);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
