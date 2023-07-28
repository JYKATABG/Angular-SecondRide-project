import { Component, OnInit } from '@angular/core';
import { OfferService } from '../offer.service';
import { ActivatedRoute } from '@angular/router';
import { Offer } from 'src/app/types/offer';

@Component({
  selector: 'app-current-offer',
  templateUrl: './current-offer.component.html',
  styleUrls: ['./current-offer.component.css']
})
export class CurrentOfferComponent implements OnInit {

  appOffer: Offer | undefined;

  constructor(private offerService: OfferService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['offerId'];
    
    this.offerService.getOneOffer(id).subscribe((offer) => {
      console.log(offer);
      
    })
  }  
}
