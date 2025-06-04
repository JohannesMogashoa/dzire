import {
  Auth,
  GoogleAuthProvider,
  User,
  UserCredential,
  authState,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  user,
} from '@angular/fire/auth';
import { Injectable, inject } from '@angular/core';
import { Observable, filter, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  auth = inject(Auth);
  user$ = authState(this.auth);

  /** Sign out */
  logout(): Observable<void> {
    const promise = signOut(this.auth);
    return from(promise);
  }

  register(
    email: string,
    password: string,
    displayName: string
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    ).then((res) => updateProfile(res.user, { displayName }));
    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.auth, email, password).then(
      (res) => {}
    );
    return from(promise);
  }

  loginWithGoogle(): Observable<void> {
    const provider = new GoogleAuthProvider();
    const promise = signInWithPopup(this.auth, provider).then((res) => {});
    return from(promise);
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
