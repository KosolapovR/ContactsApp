import React from 'react';
import Login from "./app/views/pages/Login";
import Home from "./app/views/pages/Home";
import {Route, Switch} from "react-router";
import {connect} from "react-redux";
import {checkSession} from './app/state/auth'
import Registration from "./app/views/pages/Registration";

function App({checkSession}) {

    checkSession();

    return (
        <div className="App">
            <Switch>
                <Route exact path="/login">
                    <Login/>
                </Route>
                <Route exact path="/registration">
                    <Registration/>
                </Route>
                <Route path="/">
                    <Home/>
                </Route>
            </Switch>
        </div>
    );
}

export default connect(null, {checkSession})(App);
