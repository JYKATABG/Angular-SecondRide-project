import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentOfferComponent } from './current-offer/current-offer.component';
import { NewOfferComponent } from './new-offer/new-offer.component';
import { OfferRoutingModule } from './offer-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { OfferService } from './offer.service';
import { EditOfferComponent } from './edit-offer/edit-offer.component';

@NgModule({
  declarations: [CurrentOfferComponent, NewOfferComponent, EditOfferComponent],
  imports: [CommonModule, OfferRoutingModule, ReactiveFormsModule],
})
export class OfferModule {}
