import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, take } from 'rxjs';

import { AuthService } from '@/app/services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <form (submit)="login()">
      <input type="email" [(ngModel)]="email" name="email" placeholder="your@email.com" required />
      <input type="password" [(ngModel)]="password" name="password" placeholder="your-password" required />
      <button type="submit">Login</button>
      <p *ngIf="errorMsg" class="error">{{ errorMsg }}</p>
    </form>
  `,
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class LoginComponent {
  email = '';
  password = '';
  errorMsg = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$
      .pipe(
        filter((loggedIn) => loggedIn), // only act if true
        take(1)
      )
      .subscribe(() => {
        void this.router.navigate(['/admin']);
      });
  }

  login() {
    this.errorMsg = '';
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        void this.router.navigate(['admin']);
      },
      error: () => {
        this.errorMsg = 'Login failed. Please check your credentials.';
      },
    });
  }
}
