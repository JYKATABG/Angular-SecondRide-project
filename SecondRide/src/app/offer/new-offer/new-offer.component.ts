import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { dateValidator } from 'src/app/shared/validators/date-validator';
import { OfferService } from '../offer.service';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.component.html',
  styleUrls: ['./new-offer.component.css'],
})
export class NewOfferComponent {
  isInvalid: boolean = false;

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

  constructor(private fb: FormBuilder, private offerService: OfferService) {}

  createOffer() {
    console.log(this.form.value);
    if (this.form.invalid) {
      this.isInvalid = true;
      return;
    }

    this.offerService.createNewOffer(this.form.value);
    this.form.reset();
  }
}
