/**
 * @app VuonDau
 * @author phutruongck
 */

import {ReactKeycloakProvider} from '@react-keycloak/web';
import {ToastContainer} from 'react-toastify';
import {CookiesProvider} from 'react-cookie';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';

import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.less';
import 'rsuite/styles/index.less';
import '@/assets/css/global.scss';

import AppRoute from '@/router';
import * as serviceWorker from './serviceWorker';
import configureStore from './ducks/store';
import keycloak from './keycloak';

export const store = configureStore({});

ReactDOM.render(
  <ReactKeycloakProvider authClient={keycloak}>
    <Provider store={store}>
      <CookiesProvider>
        <ToastContainer newestOnTop />
        <AppRoute />
      </CookiesProvider>
    </Provider>
  </ReactKeycloakProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
