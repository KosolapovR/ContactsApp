import {createStore, applyMiddleware, combineReducers} from "redux";
import thunkMiddleware from "redux-thunk";
import contacts from "./contacts";
import auth from './auth'
import {reducer as formReducer} from 'redux-form'

export default function configureStore() {
    const rootReducer = combineReducers({contacts, auth, form: formReducer});

    return createStore(
        rootReducer,
        applyMiddleware(
            thunkMiddleware
        ),
    );
}