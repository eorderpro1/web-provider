import { Routes } from '@angular/router';
import { BaseComponent } from './views/layout/base/base.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./views/pages/auth/auth.routes') },
  {
    path: '',
    component: BaseComponent,
    canActivateChild: [authGuard],
    children: [
      { path: '', redirectTo: 'orders', pathMatch: 'full' },
      {
        path: 'orders',
        loadChildren: () => import('./views/pages/orders/orders.routes')
      },
      {
        path: 'statistics',
        loadChildren: () => import('./views/pages/statistics/statistics.routes')
      },
      {
        path: 'products',
        loadChildren: () => import('./views/pages/product-management/product-management.routes')
      },

      {
        path: 'campaigns',
        loadChildren: () => import('./views/pages/campaigns/campaigns.routes')
      },

      {
        path: 'calendar',
        loadComponent: () => import('./views/pages/calendar/calendar.component').then(c => c.CalendarComponent)
      },
      {
        path: 'customers',
        loadComponent: () => import('./views/pages/customers/customers.component').then(c => c.CustomersComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./views/pages/profile/profile.component').then(c => c.ProfileComponent)
      },
      {
        path: 'ui-components',
        loadChildren: () => import('./views/pages/ui-components/ui-components.routes')
      },
      {
        path: 'advanced-ui',
        loadChildren: () => import('./views/pages/advanced-ui/advanced-ui.routes')
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/pages/icons/icons.routes')
      },
      {
        path: 'general',
        loadChildren: () => import('./views/pages/general/general.routes')
      }
    ]
  },
  {
    path: 'error',
    loadComponent: () => import('./views/pages/error/error.component').then(c => c.ErrorComponent),
  },
  {
    path: 'error/:type',
    loadComponent: () => import('./views/pages/error/error.component').then(c => c.ErrorComponent)
  },
  { path: '**', redirectTo: 'error/404', pathMatch: 'full' }
];
