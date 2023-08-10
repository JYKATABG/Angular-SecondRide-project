import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { UserDB } from 'src/app/types/userDB';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { OfferService } from 'src/app/offer/offer.service';
import { Offer } from 'src/app/types/offer';
import { FavouriteOffer } from 'src/app/types/favouriteOffer';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  auth = getAuth();
  userId: string = '';
  isEditMode: boolean = false;
  isInvalid: boolean = false;
  userData: UserDB | any;
  userOffers: Offer[] = [];
  userFavouriteOffers: FavouriteOffer[] = [];
  favouriteOffers: Offer[] = [];
  offersLikedByTheUser: Offer[] = [];

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
    this.userService.getAllUsers().subscribe({
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
            this.userId = this.userData._id;
          } else {
            console.log('User is signed out!');
            this.router.navigate(['/home']);
          }
        });
      },
      error: (err) => console.log(err),
    });
  }

  checkAndUpdateOffersInformation() {
    this.offerService.getAllOffers().subscribe({
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
            console.log('User is signed out!');
            this.router.navigate(['/home']);
          }
        });
      },
      error: (err) => console.log(err),
    });
  }

  checkAndUpdateFavouriteOffersInformation() {
    this.offerService.getFavouriteOffers().subscribe({
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
            console.log('User is signed out!');
            this.router.navigate(['/home']);
          }
        });
      },
      error: (err) => console.log(err),
    });
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
