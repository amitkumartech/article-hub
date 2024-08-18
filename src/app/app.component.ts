import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'article-publisher';
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {
    this.authService.isLoggedIn$.subscribe(response => {
      if (response) {
        // Add logic to check user roles here if needed
        this.isAuthenticated = true;
      }
    })


  }

  logout() {
    this.authService.logout();
  }
}
