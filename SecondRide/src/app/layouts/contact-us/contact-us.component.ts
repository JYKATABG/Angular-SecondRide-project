import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent {
  constructor(private toastr: ToastrService) {}

  isInvalid: boolean = false;

  submitForm(form: NgForm) {
    if (form.invalid) {
      this.isInvalid = true;
      return;
    }

    form.reset();
    this.isInvalid = false;
    this.toastr.success(
      'We will see the email and return message',
      'Thanks for your support!'
    );
  }
}
