import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentOfferComponent } from './current-offer/current-offer.component';
import { NewOfferComponent } from './new-offer/new-offer.component';
import { OfferRoutingModule } from './offer-routing.module';

@NgModule({
  declarations: [CurrentOfferComponent, NewOfferComponent],
  imports: [CommonModule, OfferRoutingModule],
})
export class OfferModule {}
