import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { environment } from '../../environments/environment';
import { UserLogin } from '../_models/userlogin';

@Injectable({ providedIn: 'root' })
export class UserLoginService {
    private userSubject: BehaviorSubject<UserLogin>;
    public user: Observable<UserLogin>;
    userData: any;

    constructor(
        private readonly afs: AngularFirestore, 
        public afAuth: AngularFireAuth,
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<UserLogin>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
        this.afAuth.authState.subscribe((user) => {
            if (user) {
              this.userData = user;
              localStorage.setItem('user', JSON.stringify(this.userData));
              JSON.parse(localStorage.getItem('user')!);
            } else {
              localStorage.setItem('user', 'null');
              JSON.parse(localStorage.getItem('user')!);
            }
          });
    }

    public get userValue(): UserLogin {
        return this.userSubject.value;
    }

    login(username, password) {
        return this.http.post<UserLogin>(`${environment.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }

    register(user: UserLogin) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }
    SignIn(email: string, password: string) {
        return this.afAuth
          .signInWithEmailAndPassword(email, password)
          .then((result) => {
            this.SetUserData(result.user);
            this.afAuth.authState.subscribe((user) => {
              if (user) {
                this.router.navigate(['/home']);
              }
            });
          })
          .catch((error) => {
            window.alert(error.message);
          });
      }
      // Sign up with email/password
      SignUp(email: string, password: string) {
        return this.afAuth
          .createUserWithEmailAndPassword(email, password)
          .then((result) => {
            /* Call the SendVerificaitonMail() function when new user sign 
            up and returns promise */
       
            this.SetUserData(result.user);
          })
          .catch((error) => {
            window.alert(error.message);
          });
      }
      get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));
        return (user !== null ) ? true : false;
      }
      // Sign in with Google
      
      GoogleAuth() {
        return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
          this.router.navigate(['/home']);
        });
      }
      // Auth logic to run auth providers
      AuthLogin(provider: any) {
        return this.afAuth
          .signInWithPopup(provider)
          .then((result) => {
            this.router.navigate(['/home']);
            this.SetUserData(result.user);
          })
          .catch((error) => {
            window.alert(error);
          });
      }
      /* Setting up user data when sign in with username/password, 
      sign up with username/password and sign in with social auth  
      provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
      SetUserData(user: any) {
        /*
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(
          `users/${user.displayName}`
        );*/
        const userData: UserLogin = {
            id: '',
            uid:user.uid,
            
            email: user.email,
            displayName: user.displayName,
            username: user.displayName,
            password: '',
            confirmPassword: '',
            token: '',
           
        };
        /*
        return userRef.set(userData, {
          merge: true,
        });
        */
      }
    getAll() {
        return this.http.get<UserLogin[]>(`${environment.apiUrl}/users`);
    }

    getById(id: string) {
        return this.http.get<UserLogin>(`${environment.apiUrl}/users/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue.id) {
                    this.logout();
                }
                return x;
            }));
    }
}