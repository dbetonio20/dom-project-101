import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, catchError, from, of, throwError } from 'rxjs';
import { GoogleAuthProvider } from '@firebase/auth';

type SignIn = {
  email: string,
  password: string
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(
  private auth: AngularFireAuth
) { }

 public signIn(data: SignIn): Observable<any> {
    return from(this.auth.signInWithEmailAndPassword(data.email, data.password)).pipe(
      catchError((error) => {
        // Handle errors here
        console.error('Authentication Error:', error);
        return throwError(error); // Rethrow the error to be caught by the subscriber
      })
    );
  }

public signInWithGoogle(data: SignIn): Observable <any>{
  return from(this.auth.signInWithPopup(new GoogleAuthProvider));
}


}
