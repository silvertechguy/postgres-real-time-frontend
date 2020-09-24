import React, { useState } from "react";
import axios from "axios";

const Movies = ({ movies }) => {
  const [title, setTitle] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/movies", { title });
    setTitle("");
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/movies/${id}`);
  };

  return (
    <div>
      {movies.map(({ id, title }) => (
        <h3 key={id} onClick={() => handleDelete(id)}>
          {title} - X
        </h3>
      ))}

      <form>
        <input
          name="title"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <button onClick={handleClick} type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default Movies;
