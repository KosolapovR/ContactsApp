import {GET_SESSION, GET_USER, INVALID_CREDENTIALS, SET_USER} from "./types";

const initialState = {user: {isAuth: false}};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER: {
            return {
                ...state,
                credentialsIsValid: null,
                user: {
                    ...state.user,
                    credentialsIsValid: true,
                    isAuth: true,
                    id: action.payload.id,
                    name: action.payload.name,
                    password: action.payload.password
                }
            }

        }
        case GET_SESSION: {
            return {...state, user: action.payload[0]};
        }
        case INVALID_CREDENTIALS: {
            return {
                ...state,
                credentialsIsValid: false
            };
        }
        default: {
            return state
        }
    }
};

export default authReducer;