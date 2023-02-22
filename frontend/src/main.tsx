import ReactDOM from 'react-dom/client';

import 'antd/dist/reset.css';
import './index.css';

import './auth/httpConfig';

import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import DefaultLayout from './app/layouts';
import { store } from './core/store/index';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider theme={{}}>
    <Router>
      <Provider store={store}>
        <DefaultLayout>
          <App />
        </DefaultLayout>
      </Provider>
    </Router>
  </ConfigProvider>,
);
