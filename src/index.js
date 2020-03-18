import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureStore from "./app/state/store";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {ConfigProvider} from "antd";
import ruRU from "antd/es/locale/ru_RU";


const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <ConfigProvider locale={ruRU}>
                <App/>
            </ConfigProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));


