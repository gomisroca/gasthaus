import { HttpClient, provideHttpClient } from '@angular/common/http';
import { EnvironmentProviders, Injectable, makeEnvironmentProviders } from '@angular/core';
import { BehaviorSubject, type Observable, tap } from 'rxjs';

import { environment } from '@/environments/environment';

@Injectable()
export class AuthService {
  private apiUrl = environment.apiUrl;
  private tokenKey = 'jwt_token';

  private _isLoggedIn = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this._isLoggedIn.asObservable();

  constructor(private http: HttpClient) {}

  private hasToken(): boolean {
    if (typeof localStorage === 'undefined') return false; // SSR safe
    return !!localStorage.getItem(this.tokenKey);
  }

  login(credentials: { email: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap((response) => {
        localStorage.setItem(this.tokenKey, response.token);
        this._isLoggedIn.next(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this._isLoggedIn.next(false);
  }

  getToken(): string | null {
    if (typeof localStorage === 'undefined') return null; // SSR safe
    return localStorage.getItem(this.tokenKey);
  }
}

export function provideAuthService(): EnvironmentProviders {
  return makeEnvironmentProviders([provideHttpClient(), AuthService]);
}
