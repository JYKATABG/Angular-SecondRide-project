import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OfferService } from '../offer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Offer } from 'src/app/types/offer';
import { ToastrService } from 'ngx-toastr';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.css'],
})
export class EditOfferComponent implements OnInit {
  isInvalid: boolean = false;
  originalData: Offer | undefined;
  id: string = '';
  auth = getAuth();

  constructor(
    private fb: FormBuilder,
    private offerService: OfferService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  get offerId(): string {
    return this.activatedRoute.snapshot.params['offerId'];
  }

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
    phone: [
      '',
      [Validators.required, Validators.pattern('(087)|(088)|(089)[0-9]{7}')],
    ],
    fuelTypes: ['', [Validators.required]],
    gearboxTypes: ['', [Validators.required]],
    categoryTypes: ['', [Validators.required]],
    doorsTypes: ['', [Validators.required]],
    descriptionArea: ['', [Validators.required]],
  });

  ngOnInit(): void {
    // Getting values
    this.offerService.getOneOffer(this.offerId).subscribe((result) => {
      this.originalData = result;
    });
  }

  editOffer() {
    if (this.form.invalid) {
      return alert('Form is invalid');
    }
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        const uid = user.uid;
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

        this.offerService
          .editOffer(this.offerId, {
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
            phone: phone as string,
            fuelTypes: fuelTypes as string,
            gearboxTypes: gearboxTypes as string,
            categoryTypes: categoryTypes as string,
            doorsTypes: doorsTypes as string,
            descriptionArea: descriptionArea as string,
          })
          .subscribe((res) => {
            this.router.navigate([`/offers/${this.offerId}`]);
            this.toastr.success(
              `${this.form.value?.brand}${this.form.value?.model}${this.form.value?.engine} successfully edited`,
              'Offer message'
            );
          });
      } else {
        this.toastr.error(
          'You need to be loged in to access this page',
          'Access Denied'
        );
        this.router.navigate(['/home']);
      }
    });
  }

  cancelOffer() {
    this.router.navigate([`/offers/${this.offerId}`]);
  }
}
