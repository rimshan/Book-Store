import {Component} from '@angular/core';
import { Router } from "@angular/router";
import { navItems } from '../../_nav';

import {AuthService} from '../../Services/apiServices/auth.service';
import {TokenStorage} from '../../shared/auth/token-storage';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  constructor(public route: Router,
    private authService: AuthService,
    private token: TokenStorage,
){}

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  onLogoutClick(){
    console.log('as')
      this.token.signOut();
      this.route.navigate(["/", "login"]);
  }
}
