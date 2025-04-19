import { Routes } from '@angular/router';

export default [
    { path: '', redirectTo: '', pathMatch: 'full' },

    {
        path: '',
        loadComponent: () => import('./products.component').then(c => c.ProductsComponent),
        children: [
            { path: '', redirectTo: 'overview', pathMatch: 'full' },


            {
                path: 'overview',
                loadChildren: () => import('./product-management/product-management.routes')
            },
            {
                path: 'add',
                loadChildren: () => import('./add-products/add-products.routes')
            }
        ]
    }
] as Routes;