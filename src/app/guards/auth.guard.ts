import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.auth.isLoggedIn$.pipe(
      map((loggedIn) => {
        if (loggedIn) {
          return true;
        }
        // Redirect if not authenticated
        return this.router.createUrlTree(['/']);
      })
    );
  }
}
