import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {
  constructor(private authService: AuthService) { }

  get homepageRoute(): string {
    return this.authService.isAuthenticated ? '/application/products' : '/login';
  }

}
