import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  private userSubject = new BehaviorSubject<any>(null);

  isLoggedIn$ = this.isLoggedIn.asObservable();
  user$: Observable<any> = this.userSubject.asObservable();

  constructor() {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (isLoggedIn == "true") {
      this.isLoggedIn.next(true);
      this.userSubject.next(
        {
          role: "admin"
        });
    }
    else {
      this.isLoggedIn.next(false);
      this.userSubject.next(
        {
          role: ""
        });
    }
  }

  login(email: string, password: string) {
    console.log("login method called in login service.");
    if (email == "admin" && password == "admin") {
      // Logic to authenticate user and store token
      // If successful, update isLoggedIn and userSubject
      this.isLoggedIn.next(true);
      this.userSubject.next(
        {
          role: "admin"
        });
      localStorage.setItem("loggedIn", "true");
      return of(true);

    }
    else if (email == "user" && password == "user") {
      // Logic to authenticate user and store token
      // If successful, update isLoggedIn and userSubject
      this.isLoggedIn.next(true);
      this.userSubject.next(
        {
          role: "user"
        });
      localStorage.setItem("loggedIn", "true");
      return of(true);

    }
    localStorage.setItem("loggedIn", "false");

    return of(false);
  }

  logout() {
    // Clear token and user data
    localStorage.removeItem("loggedIn");
    this.isLoggedIn.next(false);
    this.userSubject.next(null);
  }

  get isLoggedInValue() {
    return this.isLoggedIn.value;
  }

  get currentUser() {
    return this.userSubject.value;
  }
}