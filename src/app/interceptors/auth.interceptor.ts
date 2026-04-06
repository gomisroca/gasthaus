import { type HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { AuthService } from '@/app/services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (!token) {
    return next(req);
  }

  const clonedReq =
    req.body instanceof FormData
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

  return next(clonedReq);
};
