import React, { useState } from "react";

import { getAllBooks } from "../queries/queries";

//Apollo client imports
import { useQuery } from "@apollo/client";
import BookDetails from "./BookDetails";

const BookList = () => {
  const [id, setId] = useState(null);

  const { data, error, loading } = useQuery(getAllBooks);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const bookList = () => {
    return data.books.map((book) => (
      <li
        key={book.id}
        onClick={() => setId(book.id)}
      >
        {book.name}
      </li>
    ));
  };

  return (
    <div>
      <ul id={"book-list"}>{bookList()}</ul>
      <BookDetails bookId={id} />
    </div>
  );
};

export default BookList;
