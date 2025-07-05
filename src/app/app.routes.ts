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
        path: 'items',
        loadComponent: () =>
          import('./components/admin/item-list/item-list.component').then(
            (m) => m.ItemListComponent
          ),
      },
      {
        path: 'update/:id',
        loadComponent: () =>
          import('./components/admin/update/update.component').then(
            (m) => m.UpdateComponent
          ),
      },
    ],
  },
];
