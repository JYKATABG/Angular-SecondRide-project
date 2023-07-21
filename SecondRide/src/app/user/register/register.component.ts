import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  register(form: NgForm): void {
    if (form.invalid) {
      return alert('The form is invalid');
    }

    const value: { email: string; password: string } = form.value;
    console.log(value);
  }
}
