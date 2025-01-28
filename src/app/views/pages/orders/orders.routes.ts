import { Routes } from '@angular/router';

export default [
    { path: '', redirectTo: 'orders', pathMatch: 'full' },
    {
        path: 'orders',
        loadComponent: () => import('./orders.component').then(c => c.OrdersComponent),
    },
    {
        path: 'orders-management',
        loadComponent: () => import('./orders-management/orders-management.component').then(c => c.OrdersManagementComponent),
    }
] as Routes;