import { Routes } from '@angular/router';

export default [
    { path: '', redirectTo: '', pathMatch: 'full' },

    {
        path: '',
        loadComponent: () => import('./add-products.component').then(c => c.AddProductsComponent),
        children: [
            { path: '', redirectTo: 'single-product', pathMatch: 'full' },


            {
                path: 'single-product',
                loadComponent: () => import('./single-product/single-product.component')
                    .then(c => c.SingleProductComponent),
            },
            {
                path: 'category-with-products',
                loadComponent: () => import('./category-with-products/category-with-products.component')
                    .then(c => c.CategoryWithProductsComponent),
            }
            , {
                path: 'upload-file',
                loadComponent: () => import('./upload-file/upload-file.component')
                    .then(c => c.UploadFileComponent)
            },
            {
                path: 'erp-sync',
                loadComponent: () => import('./erp-sync/erp-sync.component')
                    .then(c => c.ErpSyncComponent)
            }
        ]
    }
] as Routes;