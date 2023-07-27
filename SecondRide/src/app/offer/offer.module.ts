import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentOfferComponent } from './current-offer/current-offer.component';
import { NewOfferComponent } from './new-offer/new-offer.component';
import { OfferRoutingModule } from './offer-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CurrentOfferComponent, NewOfferComponent],
  imports: [CommonModule, OfferRoutingModule, ReactiveFormsModule],
})
export class OfferModule {}
