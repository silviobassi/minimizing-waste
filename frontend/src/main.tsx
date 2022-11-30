import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import 'antd/dist/reset.css';

import DefaultLayout from "./app/layouts";
import App from "./App";
import {ConfigProvider} from "antd";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ConfigProvider
            theme={{
            token: {
                colorPrimary: '#fa6900',
            },
        }}>
            <DefaultLayout>
                <App/>
            </DefaultLayout>
        </ConfigProvider>
    </React.StrictMode>
);
