import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/employes',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'employes',
    loadComponent: () => import('./components/employee-list/employee-list.component').then(m => m.EmployeeListComponent),
    canActivate: [authGuard]
  },
  {
    path: 'employes/nouveau',
    loadComponent: () => import('./components/employee-form/employee-form.component').then(m => m.EmployeeFormComponent),
    canActivate: [authGuard]
  },
  {
    path: 'employes/modifier/:id',
    loadComponent: () => import('./components/employee-form/employee-form.component').then(m => m.EmployeeFormComponent),
    canActivate: [authGuard]
  },
  {
    path: 'employes/:id',
    loadComponent: () => import('./components/employee-detail/employee-detail.component').then(m => m.EmployeeDetailComponent),
    canActivate: [authGuard]
  }
];
