import React from 'react';
import ReactDOM from 'react-dom/client';

import 'antd/dist/reset.css';
import './index.css';

import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import DefaultLayout from './app/layouts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <DefaultLayout>
        <App />
      </DefaultLayout>
    </Router>
  </React.StrictMode>,
);
