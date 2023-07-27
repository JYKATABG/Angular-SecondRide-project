import { Component } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
} from '@angular/fire/auth';
import { matchPasswordsValidator } from 'src/app/shared/validators/match-passwords-validator';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    public auth: Auth,
    private router: Router,
    private userService: UserService
  ) {}

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

    this.userService.register(value.email, value.password);
    this.router.navigate(['/home']);
  }
}
