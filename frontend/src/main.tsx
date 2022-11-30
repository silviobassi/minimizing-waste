import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import 'antd/dist/reset.css';

import DefaultLayout from "./app/layouts";
import App from "./App";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
       <DefaultLayout>
           <App />
       </DefaultLayout>
    </React.StrictMode>
);
