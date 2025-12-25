import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { autoLogin, loginStart, loginSuccess, logout, signupStart, signupSuccess } from "./auth.actions";
import { catchError, exhaustMap, map, mergeMap, tap } from "rxjs/operators";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { setErrorMessage, setIsLoading } from "src/app/shared/shared.actions";

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router,
        private store: Store,
    ) { }

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginStart),
            exhaustMap((action) => {
                console.log('effect runned !')
                this.store.dispatch(setIsLoading({value: true}));
                return this.authService.login(action.email, action.password)
                    .pipe(map((data) => {
                        this.store.dispatch(setIsLoading({value: false}));
                        const loggedUser = this.authService.formatUserData(data);
                        // this.authService.saveUserInLocalStorage(loggedUser);
                        return loginSuccess({ user: loggedUser, redirect: true })
                    }),
                    catchError((errorResponse) => {
                        //console.log(errorResponse);
                        this.store.dispatch(setIsLoading({value: false}));
                        return of(setErrorMessage({message: "Invalid credentials"}))
                    })
                )

            })
        )
    })


    redirect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(...[loginSuccess, signupSuccess]),
            tap((action) => {
                if(action.redirect){
                    this.router.navigate(['/']);
                }
                
            })
        )

}, { dispatch: false })

    
}