import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'admin/add',
    loadComponent: () =>
      import('./components/admin/add/add.component').then(
        (m) => m.AddComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'add',
        loadComponent: () =>
          import('./components/admin/add/add.component').then(
            (m) => m.AddComponent
          ),
      },
      {
        path: 'update',
        loadComponent: () =>
          import('./components/admin/add/add.component').then(
            (m) => m.AddComponent
          ),
      },
      {
        path: 'remove',
        loadComponent: () =>
          import('./components/admin/add/add.component').then(
            (m) => m.AddComponent
          ),
      },
    ],
  },
];
