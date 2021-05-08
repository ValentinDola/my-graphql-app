import React from "react";

//Apollo client imports
import { useQuery, gql } from "@apollo/client";

//Making queries
const getAllTheBooks = gql`
  {
    books {
      name
      genre
    }
  }
`;

const BookList = () => {
  const { data, error, loading } = useQuery(getAllTheBooks);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (data) {
    console.log(data);
  }

  const bookList = () => {
    return data.books.map((book) => (
      <li>
        the book name {book.name} and the genre {book.genre}
      </li>
    ));
  };

  return (
    <div>
      <ul>{bookList()}</ul>
    </div>
  );
};

export default BookList;
