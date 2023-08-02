import { Component } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Auth, getAuth, updateCurrentUser } from '@angular/fire/auth';
import { matchPasswordsValidator } from 'src/app/shared/validators/match-passwords-validator';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  auth = getAuth();
  user = this.auth.currentUser;

  constructor(private router: Router, private userService: UserService) {}

  register(form: NgForm): void {
    if (form.invalid) {
      return alert('Form is invalid');
    }
    const value: {
      username: string;
      email: string;
      password: string;
      rePassword: string;
    } = form.value;

    matchPasswordsValidator(value.password);

    this.userService.register(value.email, value.password, value.username, {
      _userId: '',
      _id: '',
      username: value.username,
      fullName: '',
      email: value.email,
      address: '',
      phone: '',
      favouriteOffers: [''],
    });
    this.router.navigate(['/home']);
  }
}
