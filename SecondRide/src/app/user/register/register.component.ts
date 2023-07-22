import { Component } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';
import { matchPasswordsValidator } from 'src/app/shared/validators/match-passwords-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(public auth: Auth) {}

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

    console.log(value);

    // createUserWithEmailAndPassword(this.auth, value.email, value.password)
    //   .then((userCredential) => {
    //     const user = userCredential;
    //     console.log(user);

    //     console.log('User Created');
    //   })
    //   .catch((err) => console.log(err));
  }
}
