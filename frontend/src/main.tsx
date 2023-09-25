import ReactDOM from 'react-dom/client';

import 'antd/dist/reset.css';
import './index.css';

import './auth/httpConfig';

import { ConfigProvider } from 'antd';
import ptBR from 'antd/lib/locale/pt_BR';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import DefaultLayout from './app/layouts';
import { store } from './core/store/index';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider
  locale={ptBR}
  theme={{
    token: {
      // Seed Token
      colorPrimary: '#1677FF',
      borderRadius: 2,

      // Alias Token
      colorBgContainer: '#d4e7f925',
    },
  }}
>
    <Router>
      <Provider store={store}>
        <DefaultLayout>
          <App />
        </DefaultLayout>
      </Provider>
    </Router>
  </ConfigProvider>,
);
