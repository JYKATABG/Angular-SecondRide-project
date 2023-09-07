import { Component, OnDestroy, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { UserDB } from 'src/app/types/userDB';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { OfferService } from 'src/app/offer/offer.service';
import { Offer } from 'src/app/types/offer';
import { FavouriteOffer } from 'src/app/types/favouriteOffer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  auth = getAuth();
  userId: string = '';
  isEditMode: boolean = false;
  isInvalid: boolean = false;
  userData: UserDB | any;
  userOffers: Offer[] = [];
  userFavouriteOffers: FavouriteOffer[] = [];
  favouriteOffers: Offer[] = [];
  offersLikedByTheUser: Offer[] = [];
  // Subscriptions
  updateUserInfoSub: Subscription | undefined;
  updateOffersInfoSub: Subscription | undefined;
  updateFavouriteOffersInfoSub: Subscription | undefined;

  constructor(
    private userService: UserService,
    private offerService: OfferService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkAndUpdateUserInformation();
    this.checkAndUpdateOffersInformation();
    this.checkAndUpdateFavouriteOffersInformation();
  }

  checkAndUpdateUserInformation() {
    this.updateUserInfoSub = this.userService.getAllUsers().subscribe({
      next: (users) => {
        const userValues = this.userService.getArrayValues(
          Object.values(users),
          Object.keys(users)
        );
        onAuthStateChanged(this.auth, (user) => {
          if (user) {
            const uid = user.uid;
            const arrayUsers = Array(userValues);
            const correctProfile = Object.values(arrayUsers[0]).filter((x) => {
              return x._userId === uid;
            });
            this.userData = correctProfile[0];
            console.log(this.userData);

            this.userId = this.userData._id;
          } else {
            // console.log('User is signed out!');
            this.router.navigate(['/login']);
          }
        });
      },
      error: (err) => console.log(err),
    });
  }

  checkAndUpdateOffersInformation() {
    this.updateOffersInfoSub = this.offerService.getAllOffers().subscribe({
      next: (offers) => {
        const offerValues = this.offerService.getArrayValues(
          Object.values(offers),
          Object.keys(offers)
        );
        onAuthStateChanged(this.auth, (user) => {
          if (user) {
            const uid = user.uid;
            const allUserOffers = offerValues.filter((offer) => {
              return offer._ownerId === uid;
            });
            this.userOffers = allUserOffers;
          } else {
            // console.log('User is signed out!');
          }
        });
      },
      error: (err) => console.log(err),
    });
  }

  checkAndUpdateFavouriteOffersInformation() {
    this.updateFavouriteOffersInfoSub = this.offerService
      .getFavouriteOffers()
      .subscribe({
        next: (offers) => {
          const offerValues = this.offerService.getOfferArrayValues(
            Object.values(offers),
            Object.keys(offers)
          );

          onAuthStateChanged(this.auth, (user) => {
            if (user) {
              const uid = user.uid;
              const allUserOffers = offerValues.filter((offer) => {
                return offer._ownerId === uid;
              });
              this.userFavouriteOffers = allUserOffers;

              this.offerService.getAllOffers().subscribe((offer) => {
                const allOffers = this.offerService.getArrayValues(
                  Object.values(offer),
                  Object.keys(offer)
                );

                this.favouriteOffers = [];

                this.userFavouriteOffers.forEach((offer) => {
                  let id = offer._offerId;
                  const filterUserFavouriteOffers = allOffers.filter((x) => {
                    return x._id === id;
                  });
                  this.favouriteOffers = this.favouriteOffers.concat(
                    filterUserFavouriteOffers
                  );
                });
              });
            } else {
              this.toastr.error(
                'You need to be loged in to access this page',
                'Access Denied'
              );
            }
          });
        },
        error: (err) => console.log(err),
      });
  }

  ngOnDestroy(): void {
    this.updateUserInfoSub?.unsubscribe();
    this.updateOffersInfoSub?.unsubscribe();
    this.updateFavouriteOffersInfoSub?.unsubscribe();
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  saveChanges(form: NgForm): void {
    if (form.invalid) {
      this.isInvalid = true;
      return;
    }

    this.userService.editUserData(this.userId, form.value).then((res) => {
      this.toggleEditMode();
      this.toastr.success(
        'Profile information has been successfully updated!',
        'Update Notifiaction'
      );
      this.toastr.warning('Refresh to update information!', 'Tip:');
    });
  }
}
