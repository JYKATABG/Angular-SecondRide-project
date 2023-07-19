import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OffersCatalogComponent } from '../offers-catalog/offers-catalog.component';
import { CurrentOfferComponent } from './current-offer/current-offer.component';
import { NewOfferComponent } from './new-offer/new-offer.component';

const routes: Routes = [
  {
    path: 'offers',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: OffersCatalogComponent,
      },
      {
        path: ':offerId',
        component: CurrentOfferComponent,
      },
      {
        path: 'add-offer',
        component: NewOfferComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfferRoutingModule {}
