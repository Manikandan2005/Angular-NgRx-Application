import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user.model";

export const loginStart = createAction('[auth] login start', 
        props<{email: string, password: string}>()
)

export const loginSuccess = createAction('[auth] login success', 
    props<{ user: User, redirect: boolean}>()
)

export const signUpStart = createAction('[auth signup start', 
    props<{email : string, password : string}>()
)

export const signUpSuccess = createAction('[auth signup success',
    props<{ user : User ,redirect : boolean}>()
)