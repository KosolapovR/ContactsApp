import {setUser, getSession, invalidCredentials} from "./actions";
import axios from "axios";

const authentication = (credentials) => {
    return (dispatch) => {

        let promise = axios.get(
            `http://localhost:3001/users`
        );

        promise
            .then(
                (response) => {
                    const users = response.data;
                    const authorizedUser = users.filter((u) => {
                        return credentials.username === u.name && credentials.password === u.password;
                    });
                    if (authorizedUser.length) {
                        sessionStorage.setItem('authUser', JSON.stringify({user: authorizedUser}));
                        dispatch(setUser(authorizedUser[0]));
                    } else {
                        dispatch(invalidCredentials());
                    }
                }
            )
    }
};

const checkSession = () => {
    return (dispatch) => {
        if (sessionStorage.length) {
            const data = sessionStorage.getItem('authUser');
            const authUser = JSON.parse(data);
            authUser.user[0].isAuth = true;
            dispatch(getSession(authUser.user));
        }
    }
};

const logout = () => {
    return (dispatch) => {
        sessionStorage.clear();
        dispatch(getSession([{}]));
    }
};

const registration = (credentials) => {
    return (dispatch) => {

        const config = {headers: {'Content-Type': 'application/json'}};

        const content = {
            "name": credentials.username,
            "password": credentials.password,
            "contacts": []
        };

        axios.post(
            `http://localhost:3001/users`,
            content,
            config
        );
    }
};


export {setUser, authentication, checkSession, logout, registration};