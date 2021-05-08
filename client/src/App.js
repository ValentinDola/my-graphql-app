import React from 'react';

// Apollo client
import {ApolloClient, InMemoryCache} from "@apollo/client";
import {ApolloProvider} from "@apollo/client/react";
// components
import BookList from "./compo/BookList";

//Apollo client setup
const client = new ApolloClient({
    uri : "http://localhost:9000/graphql",
    cache : new InMemoryCache()
})



const App = () => {

    return (
        <ApolloProvider client={client} >
            <div>
                <BookList/>
            </div>
        </ApolloProvider>

    )
}

export default App;
