import React, { useReducer } from "react";
import { AuthReducer, initialState } from "./authReducer";

export const userContext = React.createContext({
    user: {}
});

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();

export function useAuthState() {
    const ctx = React.useContext(AuthStateContext);
    if (ctx === undefined) {
        throw new Error("useAuthState must be used within a AuthProvider");
    }
    return ctx;
}

export function useAuthDispatch() {
    const ctx = React.useContext(AuthDispatchContext);
    if (ctx === undefined) {
        throw new Error("useAuthDispatch must be used within a AuthProvider");
    }
    return ctx;
}

export const AuthProvider = ({ children }) => {
    const [user, dispatch] = useReducer(AuthReducer, initialState);

    return (
        <AuthStateContext.Provider value={user}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    )
}

