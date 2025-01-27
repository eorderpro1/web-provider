import { Routes } from '@angular/router';

export default [
    {
        path: 'todays-orders',
        loadComponent: () => import('./todays-order-overview/todays-orders-overview.component').then(c => c.TodaysOrdersOverviewComponent),
    },
    {
        path: 'orders-management',
        loadComponent: () => import('./orders-management/orders-management.component').then(c => c.OrdersManagementComponent),
    }
] as Routes;