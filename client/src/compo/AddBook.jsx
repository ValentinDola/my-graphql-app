import React from "react";

//Apollo client imports
import { useQuery, gql } from "@apollo/client";

const getAllAuthors = gql`
  {
    authors {
      name
      age
      id
    }
  }
`;

const AddBook = () => {
  const { data, error, loading } = useQuery(getAllAuthors);

  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (data) {
    console.log(data);
  }

  const selectAuthor = () => {
    return loading ? (
      <option>Loading Authors </option>
    ) : (
      data.authors.map((author) => <option>{author.name}</option>)
    );
  };

  return (
    <div>
      <form id={"add_book"}>
        <div className={"form_field"}>
          <label>Book name</label>
          <input type={"text"} />
        </div>

        <div className={"form_field"}>
          <label>Genre</label>
          <input type={"text"} />
        </div>

        <div className={"form_field"}>
          <label>Author</label>
          <select>{selectAuthor()}</select>
        </div>

        <button>+</button>
      </form>
    </div>
  );
};

export default AddBook;
