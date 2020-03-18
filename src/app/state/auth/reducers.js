import {GET_SESSION, GET_USER, SET_USER} from "./types";


const initialState = {user: {isAuth: false}};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER: {
            return {
                ...state, user: {
                    ...state.user, isAuth: true, id: action.payload.id, name: action.payload.name, password: action.payload.password
                }
            }

        }
        case GET_USER: {
            return {...state}
        }
        case GET_SESSION: {
            return {...state, user: action.payload[0]};
        }
        default: {
            return state
        }
    }
};

export default authReducer;