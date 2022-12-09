/**
 * @app VuonDau
 * @author phutruongck
 */

import App from '@/App'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import { CookiesProvider } from 'react-cookie'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import keycloak from './keycloak'
import * as serviceWorker from './serviceWorker'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

ReactDOM.render(
  <ReactKeycloakProvider authClient={keycloak}>
    <CookiesProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ToastContainer
            newestOnTop
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            rtl={false}
          />
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </CookiesProvider>
  </ReactKeycloakProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
