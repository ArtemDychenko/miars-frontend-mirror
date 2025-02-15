import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'configuration',
    pathMatch: 'full',
  },
  {
    path: 'configuration',
    loadComponent: () =>
      import('./components/configuration/configuration.component').then(
        c => c.ConfigurationComponent
      ),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(
        c => c.DashboardComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/not-found/not-found.component').then(
        c => c.NotFoundComponent
      ),
  },
];
