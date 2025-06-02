// auth.service.ts

import {
  Auth,
  GoogleAuthProvider,
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from '@angular/fire/auth';

import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser: User | null = null;

  constructor(private auth: Auth) {
    onAuthStateChanged(this.auth, (user) => {
      this.currentUserSubject.next(user);
      this.currentUser = user;
    });
  }

  /** Observable: Is user logged in */
  get isLoggedIn$() {
    return this.currentUserSubject.asObservable();
  }

  /** Direct access to current user */
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  /** Sign in with email and password */
  async login(email: string, password: string): Promise<User> {
    const credentials = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    this.currentUser = credentials.user;
    return credentials.user;
  }

  /** Sign out */
  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  /** Register a new user with email & password and send email verification */
  async register(
    email: string,
    password: string,
    displayName: string
  ): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    await updateProfile(userCredential.user, { displayName });
    //await this.sendEmailVerification(userCredential.user);
    return userCredential.user;
  }

  /** Send email verification */
  async sendEmailVerification(user?: User): Promise<void> {
    const currentUser = user ?? this.auth.currentUser;
    if (currentUser) {
      await sendEmailVerification(currentUser);
    }
  }

  async updateUserProfile(
    user: UserCredential,
    displayName: string
  ): Promise<void> {
    await updateProfile(user.user, { displayName });
  }

  /** Send password reset email */
  async resetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(this.auth, email);
  }

  /** Sign in with Google */
  async googleSignIn(): Promise<User> {
    const provider = new GoogleAuthProvider();
    const credentials = await signInWithPopup(this.auth, provider);
    return credentials.user;
  }
}
