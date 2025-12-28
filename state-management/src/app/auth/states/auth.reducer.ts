
import { createReducer, on } from "@ngrx/store";
import { initialState } from "./auth.state";
import { loginSuccess, signUpSuccess } from "./auth.actions";

export const authReducer = createReducer(
    initialState,
    on(loginSuccess, (state, action) => {
        return {
            ...state,
            user: action.user
        }
    }),
    on(signUpSuccess, (state, action) => {
        return {
            ...state,
            user: action.user
        }
    }),
)
