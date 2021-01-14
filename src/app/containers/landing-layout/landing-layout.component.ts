import {Component} from '@angular/core';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './landing-layout.component.html'
})
export class LandingLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
