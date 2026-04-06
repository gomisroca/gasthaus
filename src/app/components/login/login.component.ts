import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { filter } from 'rxjs';

import { AuthService } from '@/app/services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <form (submit)="login()">
      <input type="email" [(ngModel)]="email" name="email" placeholder="your@email.com" required />
      <input type="password" [(ngModel)]="password" name="password" placeholder="your-password" required />
      <button type="submit" [disabled]="isLoading">
        {{ isLoading ? 'Logging in...' : 'Login' }}
      </button>
      @if (errorMsg) {
        <p class="error">{{ errorMsg }}</p>
      }
    </form>
  `,
  imports: [FormsModule],
})
export class LoginComponent {
  email = '';
  password = '';
  errorMsg = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.isLoggedIn$
      .pipe(
        filter((loggedIn) => loggedIn),
        takeUntilDestroyed()
      )
      .subscribe(() => {
        void this.router.navigate(['/admin']);
      });
  }

  login(): void {
    this.errorMsg = '';
    this.isLoading = true;
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        void this.router.navigate(['/admin']);
      },
      error: () => {
        this.errorMsg = 'Login failed. Please check your credentials.';
        this.isLoading = false;
      },
    });
  }
}
