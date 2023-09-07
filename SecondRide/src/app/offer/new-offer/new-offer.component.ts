import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OfferService } from '../offer.service';
import { getAuth } from '@firebase/auth';
import { onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Offer } from 'src/app/types/offer';
import { UserService } from 'src/app/user/user.service';
import { UserDB } from 'src/app/types/userDB';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.component.html',
  styleUrls: ['./new-offer.component.css'],
})
export class NewOfferComponent implements OnInit {
  isInvalid: boolean = false;
  userData: UserDB | any;
  userId: string = '';
  isPhoneAdded: boolean = false;

  form = this.fb.group({
    carImage: ['', [Validators.required]],
    createdDate: ['', [Validators.required]],
    brand: ['', [Validators.required, Validators.minLength(2)]],
    model: ['', [Validators.required, Validators.minLength(2)]],
    engine: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.min(2)]],
    horsepower: [
      '',
      [Validators.required, Validators.min(0), Validators.maxLength(4)],
    ],
    mileage: ['', [Validators.required, Validators.min(0)]],
    location: ['', [Validators.required, Validators.minLength(3)]],
    color: ['', [Validators.required, Validators.minLength(3)]],
    phone: ['', [Validators.required, Validators.pattern(/08[7-9][0-9]{7}/g)]],
    fuelTypes: ['', [Validators.required]],
    gearboxTypes: ['', [Validators.required]],
    categoryTypes: ['', [Validators.required]],
    doorsTypes: ['', [Validators.required]],
    descriptionArea: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private offerService: OfferService,
    private userService: UserService,
    private router: Router
  ) {}
  auth = getAuth();

  ngOnInit(): void {
    this.checkAndUpdateUserInformation();
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
            if (this.userData.phone !== '') {
              this.isPhoneAdded = true;
            }
          } else {
            // console.log('User is signed out!');
            this.router.navigate(['/login']);
          }
        });
      },
      error: (err) => console.log(err),
    });
  }

  removeRequiredValidator(controlName: string) {
    const control = this.form.get(controlName);
    if (control) {
      control.setValidators([]);
      control.updateValueAndValidity();
    }
  }

  createOffer() {
    if (this.isPhoneAdded) {
      this.removeRequiredValidator('phone');
    }

    if (this.form.invalid) {
      this.isInvalid = true;
      return;
    }

    const {
      carImage,
      createdDate,
      brand,
      model,
      engine,
      price,
      horsepower,
      mileage,
      location,
      color,
      phone,
      fuelTypes,
      gearboxTypes,
      categoryTypes,
      doorsTypes,
      descriptionArea,
    } = this.form.value;

    const phoneOption = this.isPhoneAdded ? this.userData.phone : phone;

    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        const uid = user.uid;

        this.offerService.createNewOffer({
          _id: '',
          _ownerId: uid,
          carImage: carImage as string,
          createdDate: createdDate as unknown as Date,
          brand: brand as string,
          model: model as string,
          engine: engine as string,
          price: price as unknown as number,
          horsepower: horsepower as unknown as number,
          mileage: mileage as unknown as number,
          location: location as string,
          color: color as string,
          phone: phoneOption as string,
          fuelTypes: fuelTypes as string,
          gearboxTypes: gearboxTypes as string,
          categoryTypes: categoryTypes as string,
          doorsTypes: doorsTypes as string,
          descriptionArea: descriptionArea as string,
        });
        this.form.reset();
      } else {
        console.log('User is signed out!');
        this.router.navigate(['/home']);
      }
    });
  }
}
