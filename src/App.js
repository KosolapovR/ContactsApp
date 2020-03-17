import React from 'react';
import Login from "./app/views/pages/Login";
import Home from "./app/views/pages/Home";
import {Route, Switch} from "react-router";

function App() {

    return (
        <div className="App">
            <Switch>
                <Route exact path="/login">
                    <Login/>
                </Route>
                <Route path="/">
                    <Home/>
                </Route>
            </Switch>
        </div>
    );
}

export default App;
