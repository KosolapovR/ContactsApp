import {GET_USER, SET_USER} from "./types";


const initialState = {user: {isAuth: true, id: 1, name: 'Roman'}};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER: {
            return {
                ...state, user: {
                    ...state.user, isAuth: true, id: action.payload.id, name: action.payload.login
                }
            }

        }
        case GET_USER: {
            return {...state}
        }
        default: {
            return state
        }
    }
};

export default authReducer;