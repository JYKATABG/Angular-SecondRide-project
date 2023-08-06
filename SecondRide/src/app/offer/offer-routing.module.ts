import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OffersCatalogComponent } from '../offers-catalog/offers-catalog.component';
import { CurrentOfferComponent } from './current-offer/current-offer.component';
import { NewOfferComponent } from './new-offer/new-offer.component';
import { AuthActivate } from '../core/guards/auth.activate';
import { EditOfferComponent } from './edit-offer/edit-offer.component';
import { NotFoundComponent } from '../layouts/not-found/not-found.component';

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
        path: ':offerId/editOffer',
        component: EditOfferComponent,
      },
    ],
  },
  {
    path: 'add-offer',
    component: NewOfferComponent,
    // canActivate: [AuthActivate],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfferRoutingModule {}
