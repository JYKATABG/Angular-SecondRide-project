import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { dateValidator } from 'src/app/shared/validators/date-validator';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.component.html',
  styleUrls: ['./new-offer.component.css'],
})
export class NewOfferComponent {
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

  constructor(private fb: FormBuilder) {}

  register(): void {
    console.log(this.form.value);
    if (this.form.invalid) {
      return alert('Form is invalid');
    }
  }
}
