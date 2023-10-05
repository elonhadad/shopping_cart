import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    this._isAuthenticated = !!loggedInUser;
  }

  private _isAuthenticated = false;

  get isAuthenticated() {
    return this._isAuthenticated;
  }

  login() {
    this._isAuthenticated = true;
  }

  logout() {
    this._isAuthenticated = false;
  }
}
