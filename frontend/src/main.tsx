import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import 'antd/dist/reset.css';

import DefaultLayout from "./app/layouts";
import App from "./App";
import {BrowserRouter as Router} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Router>
            <DefaultLayout>
                <App />
            </DefaultLayout>
        </Router>
    </React.StrictMode>
);
