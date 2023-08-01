import { Component, OnInit } from '@angular/core';
import { OfferService } from '../offer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Offer } from 'src/app/types/offer';
import { getAuth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';

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
  id: string = '';

  constructor(
    private offerService: OfferService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['offerId'];

    this.offerService.getOneOffer(this.id).subscribe((offer) => {
      this.offerDetails = offer;
      this.isOwner = offer?._ownerId === this.user?.uid;
    });
  }
  deleteOffer() {
    this.id = this.activatedRoute.snapshot.params['offerId'];
    const confirmDelete = confirm(
      'Are you sure you want to delete this offer?'
    );
    if (confirmDelete) {
      this.offerService.deleteOffer(this.id).subscribe((result) => {
        this.router.navigate(['/offers']);
        this.toastr.success(
          `${this.offerDetails?.brand}${this.offerDetails?.model}${this.offerDetails?.engine} has been deleted`,
          'Offer message',
          { positionClass: 'toast-bottom-right' }
        );
      });
    }
  }
}
