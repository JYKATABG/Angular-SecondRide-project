import { Component, OnInit } from '@angular/core';
import { OfferService } from '../offer/offer.service';
import { Offer } from '../types/offer';

@Component({
  selector: 'app-offers-catalog',
  templateUrl: './offers-catalog.component.html',
  styleUrls: ['./offers-catalog.component.css'],
})
export class OffersCatalogComponent implements OnInit {
  appOffers: Offer[] = [];
  offerId: String = '';

  constructor(private offerService: OfferService) {}

  ngOnInit(): void {
    this.offerService.getAllOffers().subscribe({
      next: (offers) => {
        const offerValues = this.offerService.getArrayValues(
          Object.values(offers),
          Object.keys(offers)
        );
        this.appOffers = offerValues;
      },
      error: (err) => console.log(err),
    });
  }
}
