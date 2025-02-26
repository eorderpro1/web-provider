import { Routes } from '@angular/router';

export default [
    { path: '', redirectTo: '', pathMatch: 'full' },
    {
        path: '',
        loadComponent: () => import('./product-management.component').then(c => c.ProductManagementComponent),
    },
 
] as Routes;