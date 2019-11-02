import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  allow: any;

  constructor() {
    this.allow = localStorage.getItem('allow');
  }

  canActivate() {
    if (this.allow) {
      return true
    }
    return false
  }
}