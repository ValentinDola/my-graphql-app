import React from 'react';

//Apollo client imports
import {useQuery, gql} from '@apollo/client';
import { graphql } from "@apollo/client/react/hoc";


//Making queries
const getAllTheBooks = gql`
    {
        books {
            name
            genre
        }
    }
`;

const BookList = (props) => {

    const {data, error, loading} = useQuery(getAllTheBooks);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    if (data) {
        console.log(data)
    }

    // console.log(props)

    return (
        <div>
            <ul>
                {data.books.map(book => (
                    <li>
                        {book.name}
                    </li>
                ) )}
            </ul>
        </div>
    )
}

export default BookList;
