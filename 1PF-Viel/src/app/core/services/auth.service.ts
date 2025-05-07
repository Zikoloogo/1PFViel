import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../featured/auth/interfaces/User';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authUser = new BehaviorSubject<User | null>(null);
  authUser$ = this._authUser.asObservable();

  private TOKEN = 'my_secret_token';

  private users = [
    {
      email: 'admin@test.com',
      password: 'admin',
      role: 'admin',
    },
    {
      email: 'user@test.com',
      password: 'abcd1234',
      role: 'user',
    },
  ];

  constructor() {}

  login(email: string, password: string): boolean {
    const user = this.users.find(
      (user) => user.email === email && user.password === password
    );
    if (!user) {
      return false;
    }

    this._authUser.next(user);

    localStorage.setItem('token', this.TOKEN);
    return true;
  }

  getRole() {
    return this.authUser$;
  }

  verifyToken(): Observable<boolean> {
    const token = localStorage.getItem('token');

    return of(token === this.TOKEN);
  }

  logout() {
    this._authUser.next(null);
  }
}

//     this.authUser = {
//       email,
//       role: 'admin',
//     };

//     return true;
//   }

//   logout() {
//     this.authUser = null;
//   }
// }
