import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor() {}

  canActivate() {
    // remove true before integration
    const currentUser = localStorage.getItem('ACCESS_TOKEN');
    if (currentUser) {
      // logged in so return true
      return true;
    }
    // not logged in so redirect to login page with the return url
    let storage: any = localStorage.getItem('token') || null;
    storage = storage ? JSON.parse(storage) : null;
    location.replace(`/login`);
    return false;
  }
}
