import { Routes } from '@angular/router';
import { MarketAssetsComponent } from './view/market-assets/market-assets.component';

export const routes: Routes = [
  { path: 'market-assets', component: MarketAssetsComponent },
  { path: '',   redirectTo: '/market-assets', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent },
];
