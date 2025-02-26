import { Routes } from '@angular/router';

export default [
    { path: '', redirectTo: '', pathMatch: 'full' },

    {
        path: '',
        loadComponent: () => import('./orders.component').then(c => c.OrdersComponent),
        children: [
            { path: '', redirectTo: 'todays-orders', pathMatch: 'full' }, 

            {
                path: 'todays-orders',
                loadComponent: () => import('./todays-order-overview/todays-orders-overview.component')
                    .then(c => c.TodaysOrdersOverviewComponent),
            },
            {
                path: 'orders-management',
                loadComponent: () => import('./orders-management/orders-management.component')
                    .then(c => c.OrdersManagementComponent),
            }
        ]
    }
] as Routes;