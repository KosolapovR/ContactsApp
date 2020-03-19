import {GET_CONTACT_LIST} from "./types";

const setFetchingData = (payload) => {
    return {
        type: GET_CONTACT_LIST,
        payload
    }
};

export {
    setFetchingData
    }