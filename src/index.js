import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { ApolloProvider } from "@apollo/client";

import { Provider } from "react-redux";
import store from './Redux/store';
import { persistor } from './Redux/store';
import { PersistGate } from 'redux-persist/integration/react';


export const client = new ApolloClient({
  uri: "https://scandiweb-server-c53i.onrender.com/",
  cache: new InMemoryCache(),
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </ApolloProvider>
  </Provider>
);

