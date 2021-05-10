import React, { useState } from "react";

import {
  getAllAuthors,
  addBookMutation,
  getAllBooks,
} from "../queries/queries";

//Apollo client imports
import { useQuery, useMutation } from "@apollo/client";

const AddBook = () => {
  const [formState, setFormState] = useState({
    name: "",
    genre: "",
    authorId: null,
  });

  const [addBook] = useMutation(addBookMutation, {
    variables: {
      name: formState.name,
      genre: formState.genre,
      authorId: formState.authorId,
    },
    refetchQueries: [{ query: getAllBooks }],
  });

  const { data, error, loading } = useQuery(getAllAuthors);

  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const selectAuthor = () => {
    return loading ? (
      <option>Loading Authors </option>
    ) : (
      data.authors.map((author) => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ))
    );
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    addBook()
      .then((r) => alert("You just add a new book"))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <form id={"add_book"} onSubmit={onSubmitForm}>
        <div className={"field"}>
          <label>Book name</label>
          <input
            type={"text"}
            onChange={(e) =>
              setFormState({
                ...formState,
                name: e.target.value,
              })
            }
          />
        </div>

        <div className={"field"}>
          <label>Genre</label>
          <input
            type={"text"}
            onChange={(e) =>
              setFormState({
                ...formState,
                genre: e.target.value,
              })
            }
          />
        </div>

        <div className={"field"}>
          <label>Author</label>
          <select
            onChange={(e) =>
              setFormState({
                ...formState,
                authorId: e.target.value,
              })
            }
          >
            <option>Select Author</option>
            {selectAuthor()}
          </select>
        </div>

        <button>Add</button>
      </form>
    </div>
  );
};

export default AddBook;
