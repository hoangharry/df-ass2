import React, { useReducer } from "react";

let token = localStorage.getItem("jwt-auth");
let uid = localStorage.getItem("uid");

export const initialState = {
    uid: "" || uid,
    token: "" || token,
}

export const AuthReducer = (initialState, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...initialState,
                uid: action.payload.uid,
                token: action.payload.token,
            };
        case "LOG_OUT":
            return {
                ...initialState,
                uid: "",
                token: "",
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

export async function loginUser(dispatch, uid, token) {
    dispatch({type: 'LOGIN_SUCCESS', payload: {uid: uid, token: token }})
}