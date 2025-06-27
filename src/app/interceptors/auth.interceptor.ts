import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (!token) {
    return next(req);
  }

  const headersConfig: { [name: string]: string } = {
    Authorization: `Bearer ${token}`,
  };

  const clonedReq =
    req.body instanceof FormData
      ? req.clone({ setHeaders: headersConfig })
      : req.clone({
          setHeaders: {
            ...headersConfig,
            'Content-Type': 'application/json',
          },
        });

  return next(clonedReq);
};
