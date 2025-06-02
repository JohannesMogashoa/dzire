import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthenticationService } from '../../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthPageGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Access the route's URL
    const user = this.authService.getCurrentUser();

    if (user && state.url === '/login') {
      this.router.navigate(['/dashboard']);
      return false;
    } else if (user && state.url === '/register') {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
}
