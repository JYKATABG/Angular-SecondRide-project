import { Component, OnInit } from '@angular/core';
import { OfferService } from '../offer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Offer } from 'src/app/types/offer';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/user/user.service';
import { Database, onChildAdded, onValue, ref } from '@angular/fire/database';
import { FavouriteOffer } from 'src/app/types/favouriteOffer';

@Component({
  selector: 'app-current-offer',
  templateUrl: './current-offer.component.html',
  styleUrls: ['./current-offer.component.css'],
})
export class CurrentOfferComponent implements OnInit {
  offerDetails: Offer | undefined;
  isOwner: boolean | undefined;
  userId: string = '';
  auth = getAuth();
  authUser = this.auth.currentUser;
  id: string = '';
  canFavourite: boolean = true;

  constructor(
    private offerService: OfferService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['offerId'];

    this.offerService.getOneOffer(this.id).subscribe((offer) => {
      this.offerDetails = offer;
      this.isOwner = offer?._ownerId === this.authUser?.uid;
    });
    this.checkFavouriteUser();
  }

  favouriteOffer() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        const uid = user.uid;
        this.offerService.saveFavouriteOffer(this.id!, uid!).then((res) => {
          this.toastr.success(
            'Offer was successfully added to favourites',
            'Favourite offers'
          );
        });
      } else {
        console.log('User is signed out!');
      }
    });
  }

  unFavouriteOffer() {
    this.offerService.getFavouriteOffers().subscribe((offers) => {
      const favouriteOfferValues = this.offerService.getOfferArrayValues(
        Object.values(offers),
        Object.keys(offers)
      );
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          const uid = user.uid;
          const filterOfferId = favouriteOfferValues.filter((x) => {
            return x._offerId === this.id;
          });

          const filterOwnerId = filterOfferId.filter((x) => {
            return x._ownerId === uid;
          });
          const favouriteId = filterOwnerId[0]._id;

          this.offerService
            .unFavouriteOffer(favouriteId as string)
            .then((res) => {
              this.toastr.info(
                'Offer was successfully removed from favourites',
                'Favourite offers'
              );
            });
        } else {
          console.log('User is signed out!');
        }
      });
    });
  }

  checkFavouriteUser() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        const uid = user.uid;

        this.offerService.getFavouriteOffers().subscribe((data) => {
          const filterOfferData = Object.values(data).filter((x) => {
            return x._offerId === this.id;
          });
          const filterCanFavourite = filterOfferData.filter((x) => {
            return x._ownerId === uid;
          });
          this.canFavourite = filterCanFavourite.length === 0 ? true : false;
        });
      }
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
