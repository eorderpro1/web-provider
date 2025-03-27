import { Routes } from '@angular/router';

export default [
    { path: '', redirectTo: '', pathMatch: 'full' },

    {
        path: '',
        loadComponent: () => import('./campaigns.component').then(c => c.CampaignsComponent),
     
    }
] as Routes;