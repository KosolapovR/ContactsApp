import axios from "axios";

const getUser = (id) => {
    return (dispatch) => {
        let promise = axios.get(
            `http://localhost:3001/users=${id}`
        );

        promise
            .then(
                (response) => {
                    console.log(response);
                }
            )
    }
};

export {
    getUser
}