import { Injectable } from '@angular/core';
import { type CanActivate, Router, type UrlTree } from '@angular/router';
import { map, type Observable } from 'rxjs';

import { AuthService } from '@/app/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

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
