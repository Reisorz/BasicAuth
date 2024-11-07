import { Component, DoCheck } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MaterialModule, RouterModule, RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements DoCheck {

  login = false;
  logout = false;

  constructor(private router: Router) {

  }

  ngDoCheck(): void {

    //Hides Login and Register in /userlist
    let currentUrl = this.router.url;
    if (currentUrl === '/userlist'){
      this.login = false;
    } else {
      this.login = true;
    }

    //Hides Logout in the rest of urls
    if (currentUrl !== '/userlist'){
      this.logout = false;
    } else {
      this.logout = true;
    }

  }

}
