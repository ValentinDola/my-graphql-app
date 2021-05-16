import React from 'react';

// Apollo client
import {ApolloClient, InMemoryCache} from "@apollo/client";
import {ApolloProvider} from "@apollo/client/react";
// components
import BookList from "./compo/BookList";
import AddBook from "./compo/AddBook";
import BookDetails from "./compo/BookDetails";

//Apollo client setup
const client = new ApolloClient({
    uri : "http://localhost:9000/graphql",
    cache : new InMemoryCache()
})



const App = () => {

    return (
        <ApolloProvider client={client} >
            <div id={'main'}>

                    <h1>
                        Users Book List
                    </h1>

                <BookList/>
                <AddBook/>
            </div>
        </ApolloProvider>

    )
}

export default App;
