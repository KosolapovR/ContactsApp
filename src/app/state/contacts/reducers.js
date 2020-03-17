import {ADD_CONTACT_ITEM, DELETE_CONTACT_ITEM, GET_CONTACT_ITEM, GET_CONTACT_LIST, UPDATE_CONTACT_ITEM} from "./types";

const initialState = {contacts: []};

const contactsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CONTACT_ITEM: {
            return {...state}
        }
        case ADD_CONTACT_ITEM: {
            return {...state, contacts: [...state.contacts, action.payload]}
        }
        case UPDATE_CONTACT_ITEM: {
            return {...state}
        }
        case DELETE_CONTACT_ITEM: {
            return {...state}
        }
        case GET_CONTACT_LIST: {
            return {...state, contacts: action.payload}
        }
        default: {
            return state
        }
    }
};

export default contactsReducer;