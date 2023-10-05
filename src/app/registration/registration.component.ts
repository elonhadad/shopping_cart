import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  isUserExist = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), this.hasUppercase]],
      confirmPassword: ['']
    }, { validators: this.passwordMatchValidator });
  }

  hasUppercase(control: AbstractControl): { [key: string]: boolean } | null {
    const value: string = control.value;
    if (value && value === value.toLowerCase()) {
      return { noUppercase: true };
    }
    return null;
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      return { mismatch: true };
    }
    return null;
  }

  onSubmit() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const email = this.registrationForm.get('email')?.value;

    if (users.some((user: any) => user.email === email)) {
      this.isUserExist = true;
    }
    else {
      users.push(this.registrationForm.value);
      localStorage.setItem('users', JSON.stringify(users));
      this.registrationForm.reset();
      this.isUserExist = false;
      // go to login page after successful registration
      this.router.navigate(['/login']);
    }
  }
}