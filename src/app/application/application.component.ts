import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  loggedInUser: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loggedInUser = localStorage.getItem('loggedInUser');
  }

  logout() {
    this.authService.logout();
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }
}
