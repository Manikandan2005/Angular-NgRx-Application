import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
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
        private store: Store<AppState>
    ){}

    timer: any;

    login(email: string, password: string): Observable<any>{
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
        const body = {
            email,
            password,
            returnSecureToken: true 
        }
        return this.http.post(url, body);
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

}