import {gql} from '@apollo/client';

//all books
const getAllBooks = gql`
    {
        books {
            name
            genre
            id
        }
    }
`;

//all authors
const getAllAuthors = gql`
    {
        authors {
            name
            age
            id
        }
    }
`;

export {
    getAllAuthors,
    getAllBooks
}
