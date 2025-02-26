import { Routes } from '@angular/router';

export default [
    {
        path: 'sales-and-revenue',
        loadComponent: () => import('./sales-and-revenue/sales-and-revenue.component').then(c => c.SalesAndRevenueComponent),
    },
    {
        path: 'inventory-and-forecasts',
        loadComponent: () => import('./inventory-and-forecasts/inventory-and-forecasts.component').then(c => c.InventoryAndForecastsComponent),
    },
    {
        path: 'offers-and-ads',
        loadComponent: () => import('./offers-and-ads/offers-and-ads.component').then(c => c.OffersAndAdsComponent),
    },
    {
        path: 'orders-and-routes',
        loadComponent: () => import('./orders-and-routes/orders-and-routes.component').then(c => c.OrdersAndRoutesComponent),
    }
 
] as Routes;