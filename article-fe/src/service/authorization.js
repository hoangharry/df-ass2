import axios from "axios";
import { SERVER_URL } from "../constant";

export const login = (usr, pwd) => {
    return axios.post(SERVER_URL + '/login', {
        username: usr,
        password: pwd,
    });
}

export const register = (usr, pwd) => {
    return axios.post(SERVER_URL + '/register', {
        username: usr,
        password: pwd,
    });
}