import axios from "axios";
import {setFetchingData} from "./actions";

const getContactList = (user) => {
    return (dispatch) => {
        let promise = axios.get(
            `http://localhost:3001/users/${user.id}`
        );

        promise
            .then(
                (response) => {
                    dispatch(setFetchingData(response.data.contacts));
                }
            )
    }
};

const updateContact = (user, contacts) => {
    return (dispatch) => {
        const config = {headers: {'Content-Type': 'application/json'}};

        const newContacts = contacts.map((contact) => ({
            "id": contact.id,
            "name": contact.name,
            "age": contact.age,
            "address": contact.address
        }));

        const content = {
            "name": user.name,
            "password": user.password,
            "contacts": newContacts
        };
        let promise = axios.patch(`http://localhost:3001/users/${user.id}`, content, config);

        promise
            .then(
                (response) => {
                    /*dispatch(setFetchingData(response.data.contacts));*/
                }
            )
    }
};

const addContact = (user, contacts) => {
    return (dispatch) => {
        const config = {headers: {'Content-Type': 'application/json'}};

        const newContacts = contacts.map((contact) => ({
            "name": contact.name,
            "age": contact.age,
            "address": contact.address
        }));

        const content = {
            "name": user.name,
            "password": user.password,
            "contacts": newContacts
        };
        let promise = axios.put(`http://localhost:3001/users/${user.id}`, content, config);

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