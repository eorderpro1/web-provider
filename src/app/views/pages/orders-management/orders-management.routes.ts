import { Routes } from '@angular/router';

export default [
    {
        path: '',
        loadComponent: () => import('./orders-management.component').then(c => c.OrdersManagementComponent),
    }
] as Routes;