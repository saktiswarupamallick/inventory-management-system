import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from "@auth0/auth0-react";
import { GlobalProvider } from './expense/context/globalContext';
import './index.css';
import App from './App';
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { AppContextProvider } from "./invoice/context/AppContext";
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

      <Auth0Provider
            domain="dev-gv31pdguwurqao40.us.auth0.com"
            clientId="K9nYsjeczClzd1xIB1fyMhxuNoSzmriw"
            redirectUri={window.location.origin}
      >
            <GlobalProvider>
                  <AppContextProvider>
                        <Provider store={store}>
                              <App />
                        </Provider>
                  </AppContextProvider>
            </GlobalProvider>
      </Auth0Provider>


);


reportWebVitals();
