import * as usersAPI from './users-api';

export async function signUp(userData) {
    const token = await usersAPI.signUp(userData)
    localStorage.setItem('token', token)
    return getUser()
}

export async function login(userData) {
    const token = await usersAPI.logIn(userData)
    localStorage.setItem('token', token)
    return getUser()
}

export function logOut() {
    localStorage.removeItem('token')
}

export function getToken() {
    //get item and returns null if there is no string
    const token = localStorage.getItem('token');
    if (!token) return null;
    //obtain the payload of the token
    const payload = JSON.parse(atob(token.split('.')[1]));
    //a JWT's exp is expressed in seconds, not milliseconds, so convert
    if (payload.exp < Date.now() / 1000) {
        //Token has expired - remove it from localStorage
        localStorage.removeItem('token');
        return null;
    }
    return token;
}

export function getUser() {
    const token = getToken();
    // If there's a token, return the user in the payload, otherwise return null
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export function checkToken() {
    return usersAPI.checkToken()
        .then(dateStr => new Date(dateStr))
}