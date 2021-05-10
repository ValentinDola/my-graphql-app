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

const getSingleBook = gql`
    query ($id : ID){
        book(id: $id) {
            id
            name
            genre
            author {
                id
                name
                age
                book {
                    name
                    genre
                    id
                }
            }
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

const addBookMutation = gql`
    mutation($name : String!, $genre : String!, $authorId : ID!) {
        addBook(name : $name, genre : $genre, authorId : $authorId){
            name 
            genre
            id
        }
    }
`;

export {
    getAllAuthors,
    getAllBooks,
    addBookMutation,
    getSingleBook
}
