import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private userService: UserService, private router: Router) {}

  get isUserValid(): boolean {
    return !!this.userService.isUserAvailable;
  }

  login(form: NgForm): void {
    if (form.invalid) {
      return alert('Form is invalid');
    }

    const { email, password } = form.value;

    this.userService.login(email, password);
  }
}
