import {default as auth} from "./reducers";
import {authentication, checkSession, logout, registration} from "./operations";

export {
    authentication,
    checkSession,
    logout,
    registration
}

export default auth;
