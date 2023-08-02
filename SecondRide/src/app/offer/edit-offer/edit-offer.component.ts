import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { dateValidator } from 'src/app/shared/validators/date-validator';
import { OfferService } from '../offer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Offer } from 'src/app/types/offer';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.css'],
})
export class EditOfferComponent implements OnInit {
  isInvalid: boolean = false;
  originalData: Offer | undefined;
  id: string = '';

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

  form = this.fb.group(
    {
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
        [Validators.required, Validators.maxLength(9), Validators.minLength(9)],
      ],
      fuelTypes: ['', [Validators.required]],
      gearboxTypes: ['', [Validators.required]],
      categoryTypes: ['', [Validators.required]],
      doorsTypes: ['', [Validators.required]],
      descriptionArea: ['', [Validators.required]],
    },
    {
      validators: [dateValidator('createdDate')],
    }
  );

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

    this.offerService
      .editOffer(this.offerId, this.form.value)
      .subscribe((res) => {
        this.router.navigate([`/offers/${this.offerId}`]);
        this.toastr.success(
          `${this.form.value?.brand}${this.form.value?.model}${this.form.value?.engine} successfully edited`,
          'Offer message'
        );
      });
  }

  cancelOffer() {
    this.router.navigate([`/offers/${this.offerId}`]);
  }
}
