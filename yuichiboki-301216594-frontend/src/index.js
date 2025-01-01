import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { createHttpLink } from '@apollo/client/link/http';
import { InMemoryCache } from '@apollo/client/cache';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';

const httpLink = createHttpLink({
  uri: 'https://yuichiboki-301216594-project-backend.onrender.com/graphql', 
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache: cache,
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);

reportWebVitals();
