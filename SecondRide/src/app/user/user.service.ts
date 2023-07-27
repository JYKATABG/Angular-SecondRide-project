import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { User } from '../types/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User | undefined;
  USER_KEY = 'userData';
  isUserAvailable: boolean = true;

  constructor(private auth: Auth, private router: Router) {
    try {
      const lsUser = localStorage.getItem(this.USER_KEY) || '';
      this.user = JSON.parse(lsUser);
    } catch (err) {
      this.user = undefined;
    }
  }

  get isLogged(): boolean {
    return !!localStorage.getItem(this.USER_KEY);
  }

  register(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((result) => {
        localStorage.setItem(this.USER_KEY, JSON.stringify(result.user));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  login(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((result) => {
        localStorage.setItem(this.USER_KEY, JSON.stringify(result.user));
        this.router.navigate(['/home']);
      })
      .catch((err) => {
        console.log('Invalid Email or Password');
        this.isUserAvailable = false;
      });
  }

  logout(): void {
    this.auth.signOut();
    localStorage.removeItem(this.USER_KEY);
  }
}
