import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  login(form: NgForm): void {
    if (form.invalid) {
      return alert('Form is invalid');
    }
    console.log(form.value.email);
    console.log(form.value.password);
  }
}
