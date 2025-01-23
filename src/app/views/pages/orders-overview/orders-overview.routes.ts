import { Routes } from '@angular/router';

export default [
    {
        path: '',
        loadComponent: () => import('./orders-overview.component').then(c => c.OrdersOverviewComponent),
    }
] as Routes;