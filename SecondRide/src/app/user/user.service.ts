import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from '@angular/fire/auth';
import { User } from '../types/user';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserDB } from '../types/userDB';
import { Database, push, ref, update } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User | undefined;
  userId: string = '';
  USER_KEY = 'userData';
  isUserAvailable: boolean = true;
  USER_API_URL =
    'https://secondride-angular-default-rtdb.europe-west1.firebasedatabase.app/users';
  specificUserData: UserDB | any;

  constructor(
    private auth: Auth,
    private router: Router,
    private httpClient: HttpClient,
    private db: Database
  ) {
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

  register(email: string, password: string, username: string, form: UserDB) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((result) => {
        const userCredential = result;
        updateProfile(userCredential.user, { displayName: username });
        localStorage.setItem(this.USER_KEY, JSON.stringify(result.user));
        push(ref(this.db, 'users/'), {
          _userId: userCredential.user.uid,
          _id: form._id,
          username: form.username,
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          address: form.address,
          favouriteOffers: [''],
        });
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

  getAllUsers() {
    return this.httpClient.get(`${this.USER_API_URL}.json`);
  }

  editUserData(id: string, formData: UserDB) {
    return update(ref(this.db, 'users/' + id), {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
    });
  }

  getArrayValues(users: UserDB[], ids: string[]): UserDB[] {
    for (let user of users) {
      user._id = ids.shift();
    }
    return users;
  }
}
