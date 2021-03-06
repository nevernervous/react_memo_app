import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_REGISTER,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAILURE
} from './ActionTypes';
import axios from 'axios';

export function loginRequest(username, password) {
    return (dispatch) => {
        dispatch(login());

        return axios.post('/api/account/signin', {username, password})
            .then((res) => {
                dispatch(loginSuccess(username));
            }).catch((error) => {
                dispatch(loginFailure());
            });
    };

}

export function login() {
    return {
        type: AUTH_LOGIN
    };
}

export function loginSuccess(username) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        username
    };

}

export function loginFailure() {
    return {
        type: AUTH_LOGIN_FAILURE
    };
}

export function registerRequest(username, password) {
    return (dispatch) => {
        // infrom register api is starting
        return axios.post('/api/account/signup', {username, password})
            .then((res) => {
                dispatch(registerSuccess());
            }).catch((error) => {
                dispatch(registerFailure(error.response.data.code));
            });
    };
}

export function register() {
    return {
        type: AUTH_REGISTER
    };

}

export function registerSuccess() {
    return {
        type: AUTH_REGISTER_SUCCESS
    };
}

export const registerFailure = (error) => {
    return {
        type: AUTH_REGISTER_FAILURE,
        error
    };
}