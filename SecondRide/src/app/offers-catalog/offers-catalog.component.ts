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
  _filterText: string = '';
  filteredOffers: Offer[] = [];
  noMatchedOffers: string = '';

  constructor(private offerService: OfferService) {}

  get filterText() {
    return this._filterText;
  }

  set filterText(value: string) {
    this._filterText = value;
    this.filteredOffers = this.filterData(value);
  }

  ngOnInit(): void {
    this.offerService.getAllOffers().subscribe({
      next: (offers) => {
        const offerValues = this.offerService.getArrayValues(
          Object.values(offers),
          Object.keys(offers)
        );
        this.appOffers = offerValues;
        this.filteredOffers = this.appOffers;
      },
      error: (err) => console.log(err),
    });
  }

  filterData(searchData: string) {
    if (this.appOffers.length === 0 || this.filterText === '') {
      return this.appOffers;
    } else {
      return this.appOffers.filter((offer) => {
        return offer.brand.toLowerCase().includes(searchData.toLowerCase());
      });
    }
  }
}
