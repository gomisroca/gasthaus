import { HttpInterceptorFn } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);

  // Check if we're running in the browser
  if (isPlatformBrowser(platformId)) {
    // Browser-specific logic (e.g., reading from localStorage)
    const token = localStorage.getItem('authToken');

    if (token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next(authReq);
    }
  } else {
    // Server-side logic
    // You might get tokens from cookies, environment variables, or other server-side sources
    const serverToken = getServerToken(); // Your custom logic here

    if (serverToken) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${serverToken}`,
        },
      });
      return next(authReq);
    }
  }

  return next(req);
};

// Helper function for server-side token retrieval
function getServerToken(): string | null {
  // Example: Get from environment variable or server-side storage
  // This is where you'd implement your server-side token logic
  return process.env['API_TOKEN'] || null;
}
