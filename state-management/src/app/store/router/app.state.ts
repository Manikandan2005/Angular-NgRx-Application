import { authReducer } from "src/app/auth/states/auth.reducer";
import { AuthState } from "src/app/auth/states/auth.state";
import { sharedReducer } from "src/app/shared/shared.effects";
import { SharedState } from "src/app/shared/shared.state";


export interface AppState{
    auth: AuthState,
    shared: SharedState,
}

export const appReducer = {
    auth: authReducer,
    shared: sharedReducer,
}
