import {
    GET_SESSION,
    GET_USER, SET_USER,
} from "./types";

const getUser = (payload) => ({
    type: GET_USER,
    payload
});

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

export {
    getUser,
    setUser,
    getSession
}