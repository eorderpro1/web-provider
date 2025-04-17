import { Routes } from '@angular/router';

export default [
  { path: '', redirectTo: '', pathMatch: 'full' },

  {
    path: '',
    loadComponent: () =>
      import('./product-management.component').then(c => c.ProductManagementComponent),

    children: [
      {
        path: '',
        loadComponent: () =>
          import('./no-category-selected/no-category-selected.component')
            .then(c => c.NoCategorySelectedComponent),
      },
      {
        path: 'products-table',
        loadComponent: () =>
          import('./products-table/products-table.component')
            .then(c => c.ProductsTableComponent),
      }
    ]
  }
] as Routes;