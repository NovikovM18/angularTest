import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'market-assets', loadComponent:() => import('./view/market-assets/market-assets.component').then((c) => c.MarketAssetsComponent)},
  { path: '',   redirectTo: '/market-assets', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent },
];
