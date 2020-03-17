import axios from "axios";
import {setFetchingData} from "./actions";

const getContactList = (userId) => {
    return (dispatch) => {
        let promise = axios.get(
            `http://localhost:3001/users/${userId}`
        );

        promise
            .then(
                (response) => {
                    dispatch(setFetchingData(response.data.contacts));
                }
            )
    }
};

const updateContact = (userId, contacts) => {
    return (dispatch) => {
        const config = {headers: {'Content-Type': 'application/json'}};

        const newContacts = contacts.map((contact) => ({
            "id": contact.id,
            "name": contact.name,
            "age": contact.age,
            "address": contact.address
        }));

        const content = {
            "contacts": newContacts
        };
        let promise = axios.patch(`http://localhost:3001/users/${userId}`, content, config);

        promise
            .then(
                (response) => {
                    /*dispatch(setFetchingData(response.data.contacts));*/
                }
            )
    }
};

const addContact = (userId, contacts) => {
    return (dispatch) => {
        const config = {headers: {'Content-Type': 'application/json'}};

        const newContacts = contacts.map((contact) => ({
            "name": contact.name,
            "age": contact.age,
            "address": contact.address
        }));

        const content = {
            "contacts": newContacts
        };
        let promise = axios.put(`http://localhost:3001/users/${userId}`, content, config);

        promise
            .then(
                (response) => {
                    /*dispatch(setFetchingData(response.data.contacts));*/
                }
            )
    }
};

export {
    addContact,
    getContactList,
    updateContact
}