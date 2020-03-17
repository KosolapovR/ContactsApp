import {ADD_CONTACT_ITEM, DELETE_CONTACT_ITEM, GET_CONTACT_ITEM, GET_CONTACT_LIST, UPDATE_CONTACT_ITEM} from "./types";

const getContactItem = (payload) => ({
    type: GET_CONTACT_ITEM,
    payload
});

const addContactItem = (payload) => ({
    type: ADD_CONTACT_ITEM,
    payload
});

const updateContactItem = (payload) => ({
    type: UPDATE_CONTACT_ITEM,
    payload
});

const deleteContactItem = (payload) => ({
    type: DELETE_CONTACT_ITEM,
    payload
});

const setFetchingData = (payload) => {
    return {
        type: GET_CONTACT_LIST,
        payload
    }
};

export {
    getContactItem,
    setFetchingData,
    addContactItem,
    updateContactItem,
    deleteContactItem
}