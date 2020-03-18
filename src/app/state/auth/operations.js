import {setUser, getSession} from "./actions";
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
                        sessionStorage.setItem('authUser', JSON.stringify({user :authorizedUser}));
                        dispatch(setUser(authorizedUser[0]));
                    } else {
                        //dispatch auth failed
                    }
                }
            )
    }
};

const checkSession = () => {
    return (dispatch) => {
        if(sessionStorage.length){
            const data = sessionStorage.getItem('authUser');
            const authUser = JSON.parse(data);
            authUser.user[0].isAuth = true;
            dispatch(getSession(authUser.user));
        }
    }
};

export {setUser, authentication, checkSession};