import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { API_KEY } from "src/app/constants";
import { AuthResponse } from "src/app/models/auth-response";
import { User } from "src/app/models/user.model";
import { AppState } from "src/app/store/router/app.state";


@Injectable({
    providedIn: 'root'
})
export class AuthService{
    constructor(
        private http: HttpClient,
        private router: Router,
        private store: Store<AppState>
    ){}

    timer: any;

    login(email: string, password: string): Observable<AuthResponse>{
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
        const body = {
            email,
            password,
            returnSecureToken: true 
        }
        return this.http.post<AuthResponse>(url, body);
    }

    signUp(email : string, password : string): Observable<AuthResponse>{
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
        const body = {
            email,
            password,
            returnSecureToken : true
        }

        return this.http.post<AuthResponse>(url, body);
    }

    formatUserData(response: AuthResponse){
        const expirationTimestamp = Date.now() + (+response.expiresIn * 1000)
        const formattedUser: User = {
            accessToken: response.idToken,
            email: response.email,
            expiresAt: expirationTimestamp,
            userId: response.localId
        }

        return formattedUser;
    }

    setErrorMessage(errorResponse : HttpErrorResponse){
        let message = 'A unknown error has occurred !'
        if(!errorResponse.error || !errorResponse.error.error){
            return message;
        }

        switch(errorResponse.error.error.message){
            case 'INVALID_LOGIN_CREDENTIALS':
                message = 'Invalid username or password'
                break;
            case 'USER_DISABLED':
                message = 'This user has been disabled'
                break;
            case 'EMAIL_NOT_FOUND':
                message = 'Email is invalid'
                break;
            case 'INVALID_PASSWORD':
                message = 'Password is invalid'
                break;
            case 'EMAIL_EXISTS':
                message = 'A user with this email already exists'
                break;
            default:
                message = errorResponse.error.error.message
        }
        return message;
    }

    saveUserInLocalStorage(user : User){
        try{
            localStorage.setItem('currentUser', JSON.stringify(user));
        }
        catch(error){
            console.log(error);
        }
    }

    readUserFromLocalStorage(){
        try{
            const loggedUser = localStorage.getItem('currentUser');
            if(!loggedUser){
                return null;
            }
            const user : User = JSON.parse(loggedUser);
            if(user.expiresAt <= Date.now()){
                localStorage.removeItem('currentUser');
                return null;
            }

            return user;
        }
        catch(error){
            localStorage.removeItem('currentUser');
            return null;
        }
    }

    logoutUser(){
        const loggedUser = localStorage.getItem('currentUser');
        if(!loggedUser){
            return null;
        }
        localStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login'])
        return null;
    }

}