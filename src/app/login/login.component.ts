import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  invalidLogin = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  onSubmit() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    if (users.some((user: any) => user.email === email && user.password === password)) {
      this.authService.login();

      this.invalidLogin = false;
      localStorage.setItem('loggedInUser', email);
      this.router.navigate(['/application']);
    }
    else {
      this.invalidLogin = true;
    }
  }
}