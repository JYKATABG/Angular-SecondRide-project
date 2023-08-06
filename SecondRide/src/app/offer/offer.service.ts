import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Offer } from '../types/offer';
import { Database, push, ref, remove, update } from '@angular/fire/database';
import { FavouriteOffer } from '../types/favouriteOffer';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  API_LINK: string =
    'https://secondride-angular-default-rtdb.europe-west1.firebasedatabase.app/offers';
  API_FAVOURITEOFFERS_LINK: string =
    'https://secondride-angular-default-rtdb.europe-west1.firebasedatabase.app/favouriteOffers';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private db: Database
  ) {}

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

  deleteOffer(id: string) {
    return this.httpClient.delete(`${this.API_LINK}/${id}.json`);
  }

  editOffer(id: string, changedData: object) {
    return this.httpClient.put(`${this.API_LINK}/${id}.json`, changedData);
  }

  getFavouriteOffers() {
    return this.httpClient.get(`${this.API_FAVOURITEOFFERS_LINK}.json`);
  }

  saveFavouriteOffer(offerId: string, ownerId: string) {
    return push(ref(this.db, 'favouriteOffers/'), {
      _offerId: offerId,
      _ownerId: ownerId,
    });
  }

  unFavouriteOffer(id: string) {
    return remove(ref(this.db, 'favouriteOffers/' + id));
  }

  getOfferArrayValues(
    offers: FavouriteOffer[],
    ids: string[]
  ): FavouriteOffer[] {
    for (let offer of offers) {
      offer._id = ids.shift();
    }
    return offers;
  }
}
