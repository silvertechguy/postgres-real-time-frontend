import React, { useEffect, useState } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";
import Movies from "./Movies";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await axios.get("http://localhost:8080/movies");
      setMovies(res.data.movies);
    };
    fetchMovies();
    return () => {};
  }, []);


  useEffect(() => {
    const socket = socketIOClient("http://localhost:8080");
    socket.on("insert_movies", (newMovie) => {
      setMovies((pre) => [...pre, newMovie]);
    });

    socket.on("delete_movies", (oldMovie) => {
      setMovies((pre) => pre.filter((m) => m.id !== oldMovie.id));
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="App">
      <Movies movies={movies} />
    </div>
  );
}

export default App;
