import {setUser} from "./actions";
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
                        return credentials.username === u.login && credentials.password === u.password;
                    });
                    if (authorizedUser.length) {
                        dispatch(setUser(authorizedUser[0]));
                    } else {
                        //dispatch auth failed
                    }
                }
            )
    }
};

export {setUser, authentication};