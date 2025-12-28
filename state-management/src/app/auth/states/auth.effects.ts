import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loginStart, loginSuccess, signUpStart, signUpSuccess} from "./auth.actions";
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
                this.store.dispatch(setIsLoading({value: true}));
                return this.authService.login(action.email, action.password)
                    .pipe(map((data) => {
                        this.store.dispatch(setIsLoading({value: false}));
                        const loggedUser = this.authService.formatUserData(data);
                        return loginSuccess({ user: loggedUser, redirect: true })
                    }),
                    catchError((errorResponse) => {
                        this.store.dispatch(setIsLoading({value: false}));
                        const message = this.authService.setErrorMessage(errorResponse);
                        return of(setErrorMessage({message: message}))
                    })
                )

            })
        )
    })

    signUp$ = createEffect(() =>{
        return this.actions$.pipe(
            ofType(signUpStart),
            exhaustMap((action)=>{
               this.store.dispatch(setIsLoading({value : true}))
               return this.authService.signUp(action.email, action.password).pipe(
                map((response)=>{
                    this.store.dispatch(setIsLoading({value : false}))
                    return signUpSuccess({user : response, redirect : true})
                }),
                catchError((errorResponse)=>{
                    this.store.dispatch(setIsLoading({value : false}));
                    const message = this.authService.setErrorMessage(errorResponse);
                    return of(setErrorMessage({message : message}))
                })
               ) 
            })
        )
    })

    redirect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(...[loginSuccess, signUpSuccess]),
            tap((action) => {
                if(action.redirect){
                    this.router.navigate(['/']);
                }
                
            })
        )

}, { dispatch: false })

    
}