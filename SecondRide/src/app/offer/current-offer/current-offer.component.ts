import { Component, OnInit } from '@angular/core';
import { OfferService } from '../offer.service';
import { ActivatedRoute } from '@angular/router';
import { Offer } from 'src/app/types/offer';
import { getAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-current-offer',
  templateUrl: './current-offer.component.html',
  styleUrls: ['./current-offer.component.css'],
})
export class CurrentOfferComponent implements OnInit {
  offerDetails: Offer | undefined;
  isOwner: boolean | undefined;
  auth = getAuth();
  user = this.auth.currentUser;

  constructor(
    private offerService: OfferService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['offerId'];

    this.offerService.getOneOffer(id).subscribe((offer) => {
      debugger
      this.offerDetails = offer;
      this.isOwner = offer?._ownerId === this.user?.uid;
      console.log(this.isOwner);
    });
  }
}
