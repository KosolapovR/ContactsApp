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
            "phone": contact.phone,
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
                    dispatch(setFetchingData(response.data.contacts));
                }
            )
    }
};

const addContact = (user, contacts) => {
    return (dispatch) => {
        const config = {headers: {'Content-Type': 'application/json'}};

        const newContacts = contacts.map((contact, index) => {
                if (!contact.id) {
                    if (index < 1) {
                        contact.id = 0
                    } else {
                        contact.id = contacts[index - 1].id + 1;
                    }
                }
                return {
                    "id": contact.id,
                    "name": contact.name,
                    "phone": contact.phone,
                    "age": contact.age,
                    "address": contact.address
                };
            }
        );

        const content = {
            "name": user.name,
            "password": user.password,
            "contacts": newContacts
        };
        let promise = axios.put(`http://localhost:3001/users/${user.id}`, content, config);

        promise
            .then(
                (response) => {
                    dispatch(setFetchingData(response.data.contacts));
                }
            )
    }
};

const deleteContact = (user, contacts, deletableContactsId) => {
    return (dispatch) => {
        const config = {headers: {'Content-Type': 'application/json'}};

        const filteredContacts = contacts.filter(contact => (contact.id !== deletableContactsId));

        const newContacts = filteredContacts.map((contact) => {
                return {
                    "id": contact.id,
                    "name": contact.name,
                    "phone": contact.phone,
                    "age": contact.age,
                    "address": contact.address
                };
            }
        );

        const content = {
            "name": user.name,
            "password": user.password,
            "contacts": newContacts
        };
        let promise = axios.put(`http://localhost:3001/users/${user.id}`, content, config);

        promise
            .then(
                (response) => {
                    dispatch(setFetchingData(response.data.contacts));
                }
            )
    }
};

export {
    addContact,
    getContactList,
    updateContact,
    deleteContact
}