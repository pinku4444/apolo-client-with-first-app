import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ApolloClient} from 'apollo-client'
import {ApolloProvider} from 'react-apollo'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {HttpLink} from 'apollo-link-http'

const httpLink = new HttpLink({ 
    uri :'http://localhost:6002/graphql'
});


const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App  />
    </ApolloProvider>
, document.getElementById('root'));


