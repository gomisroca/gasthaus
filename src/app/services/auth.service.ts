import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private tokenKey = 'jwt_token';

  constructor() {}

  login(credentials: {
    email: string;
    password: string;
  }): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>('/api/auth/login', credentials)
      .pipe(
        tap((response: { token: string }) =>
          localStorage.setItem(this.tokenKey, response.token)
        )
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken(); // Optional: Add real JWT expiration check
  }
}
