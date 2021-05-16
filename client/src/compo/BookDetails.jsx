import React from "react";

import { useQuery } from "@apollo/client";

import { getSingleBook } from "../queries/queries";

const BookDetails = ({bookId}) => {
  const { data, error, loading } = useQuery(getSingleBook, {
    variables: {
      id: bookId,
    },
  });
  if (loading) return null
  if (error) return `Error ${error}`;
  if (data) console.log(data);

  const displayBookDetails = () => {

      const {book} = data.book;

    if (data) {
      return (

        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All the books by this author</p>
          <ul className={"other-books"}>
            {book.author.book.map((bk) => (
              <li key={bk.id}>{bk.name}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return (
        <div>
          <h3>No book selected</h3>
        </div>
      );
    }
  };

  return <div id={'book-details'} >{displayBookDetails()}</div>;
};

export default BookDetails;
