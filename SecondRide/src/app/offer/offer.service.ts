import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Offer } from '../types/offer';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  API_LINK: string =
    'https://secondride-angular-default-rtdb.europe-west1.firebasedatabase.app/offers';

  constructor(private httpClient: HttpClient, private router: Router) {}

  createNewOffer(formData: object) {
    this.httpClient
      .post<Offer[]>(`${this.API_LINK}.json`, formData)
      .subscribe((res) => {
        this.router.navigate(['/offers']);
      });
  }

  getAllOffers() {
    return this.httpClient.get<Offer[]>(`${this.API_LINK}.json`);
  }

  getArrayValues(offers: Offer[], ids: string[]): Offer[] {
    for (let offer of offers) {
      offer._id = ids.shift();
    }
    return offers;
  }

  getOneOffer(id: string) {
    return this.httpClient.get<Offer>(`${this.API_LINK}/${id}.json`);
  }
}
