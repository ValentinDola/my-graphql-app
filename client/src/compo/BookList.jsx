import React from "react";

import {getAllBooks} from "../queries/queries";

//Apollo client imports
import { useQuery } from "@apollo/client";


const BookList = () => {
  const { data, error, loading } = useQuery(getAllBooks);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (data) {
    console.log(data);
  }

  const bookList = () => {
    return data.books.map((book) => (
      <li key={book.id} >
        the book name {book.name} and the genre {book.genre}
      </li>
    ));
  };

  return (
    <div>
      <ul id={'book-list'}>{bookList()}</ul>
    </div>
  );
};

export default BookList;
