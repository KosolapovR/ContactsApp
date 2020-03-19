import {
    GET_SESSION,
    INVALID_CREDENTIALS,
    SET_USER,
} from "./types";

const setUser = (payload) => ({
    type: SET_USER,
    payload
});

const getSession = (payload) => {
    return {
        type: GET_SESSION,
        payload
    }
};

const invalidCredentials = () => ({
    type: INVALID_CREDENTIALS,
});

export {
    setUser,
    getSession,
    invalidCredentials
}