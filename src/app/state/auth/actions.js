import {
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

export {
    getUser,
    setUser
}