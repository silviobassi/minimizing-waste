import ReactDOM from 'react-dom/client';

import 'antd/dist/reset.css';
import './index.css';

import './auth/httpConfig';

import { ConfigProvider } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import DefaultLayout from './app/layouts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider theme={{}}>
    <Router>
      <DefaultLayout>
        <App />
      </DefaultLayout>
    </Router>
  </ConfigProvider>,
);
